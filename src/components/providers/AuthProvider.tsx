"use client";

import React from "react";
import { useMutation, QueryClient } from "@tanstack/react-query";
import { authService, userService } from "@/services";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import localStorageService from "@/services/storages/localStorage";
import { decodeJwt } from "jose";
import { message } from 'antd'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
});

// Utility function to check if current path is admin route
const isAdminRoute = () => {
  return (
    typeof window !== "undefined" &&
    window.location.pathname.startsWith("/admin")
  );
};

const isAdmin = (role: string) => {
  return role !== 'user'
}

// Utility function to check if token is expired
const isTokenExpired = (token?: string): boolean => {
  if (!token) return true;

  try {
    const decoded = decodeJwt(token);
    if (!decoded.exp) return true;

    const now = Date.now() / 1000;
    return decoded.exp < now;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};

// Utility function to check if token will expire soon (within 5 minutes)
const isTokenExpiringSoon = (token?: string): boolean => {
  if (!token) return true;

  try {
    const decoded = decodeJwt(token);
    if (!decoded.exp) return true;

    const now = Date.now() / 1000;
    const fiveMinutesFromNow = now + 5 * 60; // 5 minutes in seconds
    return decoded.exp < fiveMinutesFromNow;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};

type AuthContextType = {
  user: App.Services.AuthService.LoginResponse["user"];
  isLoading: boolean;
  isAuthenticated: boolean;
  login: App.Services.AuthService.login;
  logout: () => void;
  refreshToken: App.Services.AuthService.refreshToken;
  loginError: Error;
  isLoginLoading: boolean;
  isAdmin: boolean;
  signup: App.Services.AuthService.register;
  sendVerifyEmail: App.Services.AuthService.sendVerifyEmail;
};

const AuthContext = React.createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => { throw new Error('Login not initialized') },
  logout: () => {},
  refreshToken: async () => { throw new Error('Refresh token not initialized') },
  loginError: null,
  sendVerifyEmail: async () => { throw new Error('Send verify email not initialized') },
  isLoginLoading: false,
  isAdmin: false,
  signup: async () => { throw new Error('Signup not initialized') }
});

export const useAuth = () => {
  return React.useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<
    App.Services.AuthService.LoginResponse["user"] | null
  >(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isClient, setIsClient] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const getUserMutation = useMutation({
    mutationFn: userService.getUser,
    onSuccess: (res) => {
      setUser(res.data);
    }
  });

  // Ensure we're on the client side before accessing localStorage
  React.useEffect(() => {
    setIsClient(true);
    // Initialize user from localStorage only on client side
    const userFromStorage = localStorageService.load("user");
    setUser(userFromStorage);
  }, []);

  React.useEffect(() => {
    if (!isClient) return; // Don't run on server side

    const initializeAuth = async () => {
      const accessToken = localStorageService.load("accessToken");
      const refreshTokenLocal = localStorageService.load("refreshToken");
      const userLocal = localStorageService.load("user");

      const isAdmin = userLocal ? userLocal.role !== "user" : false;
      const isNotHaveToken = !refreshTokenLocal;

      console.log("render auth provider");

      // Check if access token is expired or missing
      const isAccessTokenExpired = isTokenExpired(accessToken);
      const isAccessTokenExpiringSoon = isTokenExpiringSoon(accessToken);

      if (
        (isAccessTokenExpired || isAccessTokenExpiringSoon) &&
        refreshTokenLocal
      ) {
        console.log(
          "Access token expired, missing, or expiring soon, attempting refresh..."
        );
        try {
          await refreshToken();
          console.log("Token refresh successful during initialization");
        } catch (error) {
          console.error(
            "Failed to refresh token during initialization:",
            error
          );
          // If refresh fails, clear everything and redirect
          localStorageService.delete("accessToken");
          localStorageService.delete("refreshToken");
          localStorageService.delete("user");
          if (isAdminRoute()) {
            router.push("/login");
          }
          setIsLoading(false);
          return;
        }
      }

      // Handle admin route protection
      if (isAdminRoute()) {
        if (!userLocal || (isAccessTokenExpired && !refreshTokenLocal)) {
          router.push("/login");
          setIsLoading(false);
          return;
        }

        if (!isAdmin) {
          router.push("/unauthorized");
          setIsLoading(false);
          return;
        }
      }

      // Redirect from login routes if already authenticated
      const isLoginRoute = pathname === "/login" || pathname === "/signup";
      if (isLoginRoute && !isNotHaveToken) {
        if (isAdmin) {
          router.push("/admin");
        } else {
          router.push("/");
        }
      }

      setIsLoading(false);
    };

    initializeAuth();
  }, [pathname, router, isClient]);

  // Periodic token refresh check (every 4 minutes)
  React.useEffect(() => {
    if (!user || !isClient) return; // Only run if user is authenticated and on client

    const interval = setInterval(async () => {
      const accessToken = localStorageService.load("accessToken");
      const refreshTokenLocal = localStorageService.load("refreshToken");

      if (isTokenExpiringSoon(accessToken) && refreshTokenLocal) {
        console.log("Token expiring soon, refreshing...");
        try {
          await refreshToken();
          console.log("Periodic token refresh successful");
        } catch (error) {
          console.error("Periodic token refresh failed:", error);
          logout();
        }
      }
    }, 4 * 60 * 1000); // Check every 4 minutes
    queryClient.invalidateQueries({ queryKey: ["user"] });

    return () => clearInterval(interval);
  }, [user, isClient]);

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (res) => {
      console.log('Login response full:', res);
      console.log('res.code:', res.code);
      console.log('res.data:', res.data);
      console.log('res.data.user:', res.data?.user);
      
      // Kiểm tra status code trước
      if (res.code !== 200) {
        console.error('Login failed with status:', res.code, res.message);
        message.error('Email hoặc mật khẩu sai! Vui lòng thử lại');
        return;
      }
      
      // Response structure thực tế: { code: 200, data: { user, tokens }, message: 'success' }
      if (res.data && res.data.user && res.data.tokens) {
        const { access, refresh } = res.data.tokens;
        const { role } = res.data.user;

        localStorageService.save("user", res.data.user);
        localStorageService.save("accessToken", access.token);
        localStorageService.save("refreshToken", refresh.token);
        setUser(res.data.user)

        queryClient.invalidateQueries({ queryKey: ["user"] });

        if (isAdmin(role)) {
          router.push("/admin");
        } else {
          router.push("/");
        }
      } else {
        console.error('Invalid login response structure:', res);
        message.error('Email hoặc mật khẩu sai! Vui lòng thử lại')
      }
    },
    onError: (error) => {
      console.error("Login error:", error);
      message.error('Email hoặc mật khẩu sai! Vui lòng thử lại')
    }
  });

  const refreshTokenMutation = useMutation({
    mutationFn: authService.refreshToken,
    onSuccess: (res) => {
      console.log("refreshTokenMutation success:", res);
      if (res.data) {
        const { access, refresh } = res.data;
        localStorageService.save("accessToken", access.token);
        localStorageService.save("refreshToken", refresh.token);
        getUserMutation.mutate(localStorageService.load("user").id);
      }
    },
    onError: (error) => {
      console.error("Token refresh error:", error);
      logout();
      if (isAdminRoute()) {
        router.push("/login");
      }
    }
  });

  const signupMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (res) => {
      if (res.data && res.data.data) {
        const access = res.data.data.tokens.access;
        const refresh = res.data.data.tokens.refresh;
        setUser(res.data.data.user)
        localStorageService.save("user", res.data.data.user);
        localStorageService.save("accessToken", access.token);
        localStorageService.save("refreshToken", refresh.token);
        queryClient.invalidateQueries({ queryKey: ["user"] });
      }
    }
  });

  const sendVerifyEmailMutation = useMutation({
    mutationFn: authService.sendVerifyEmail,
    onSuccess: () => { setIsLoading(false) }
  })

  const login = (credentials: App.Services.AuthService.LoginCredentials) => {
    return loginMutation.mutateAsync(credentials);
  };

  const signup = (
    credentials: App.Services.AuthService.RegisterCredentials
  ) => {
    return signupMutation.mutateAsync(credentials);
  };

  const sendVerifyEmail = () => {
    setIsLoading(true)
    return (sendVerifyEmailMutation.mutateAsync(user.id))
  }

  const logout = () => {
    localStorageService.delete("accessToken");
    localStorageService.delete("refreshToken");
    localStorageService.delete("user");
    setUser(null)
    queryClient.clear();

    // Check if current path is admin route and redirect
    if (isAdminRoute()) {
      router.push("/login");
    }
  };

  const refreshToken = async () => {
    console.log("AuthProvider refreshToken called");
    const refreshToken = localStorageService.load("refreshToken");
    if (!refreshToken) {
      console.log("No refresh token in AuthProvider");
      localStorageService.delete("user");
      localStorageService.delete("accessToken");
      localStorageService.delete("refreshToken");

      // Check if current path is admin route and redirect
      if (isAdminRoute()) {
        router.push("/login");
      }
      throw new Error("No refresh token available");
    }
    console.log("Calling refreshTokenMutation...");
    return refreshTokenMutation.mutateAsync({ refreshToken });
  };

  const value = {
    user,
    isLoading: isLoading || loginMutation.isPending,
    isAuthenticated: isClient && !!user && !!localStorageService.load("accessToken"),
    login,
    signup,
    logout,
    refreshToken,
    sendVerifyEmail,
    loginError: loginMutation.error,
    isAdmin:
      user?.role === "admin" ||
      user?.role === "superAdmin" ||
      user?.role === "moderator",
    isLoginLoading: loginMutation.isPending
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
