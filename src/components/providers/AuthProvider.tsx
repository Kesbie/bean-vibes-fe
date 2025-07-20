"use client";

import React from "react";
import {
  useMutation,
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";
import AuthService from "@/services/auth";
import ProfileService from "@/services/profile";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import LocalStorage from "@/services/storages/localStorage";

const authService = new AuthService();
const profileService = new ProfileService();
const localStorage = new LocalStorage();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
});

type AuthContextType = {
  user: App.Services.AuthService.LoginResponse["user"];
  isLoading: boolean;
  isAuthenticated: boolean;
  login: App.Services.AuthService.Login;
  logout: () => void;
  refreshToken: App.Services.AuthService.RefreshToken;
  loginError: Error;
  isLoginLoading: boolean;
};

const AuthContext = React.createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: null,
  logout: null,
  refreshToken: null,
  loginError: null,
  isLoginLoading: false
});

export const useAuth = () => {
  return React.useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState<
    App.Services.AuthService.LoginResponse["user"]
  >(localStorage.load("user"));
  const [isLoading, setIsLoading] = React.useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // const { data: user, refetch: refetchUser } = useQuery({
  //   queryKey: ["user"],
  //   queryFn: () => profileService.getProfile().then(res => {
  //     const user = res.data;
  //     localStorage.save("user", user);
  //     return user;
  //   }),
  //   enabled: !!localStorage.load("accessToken")
  // });

  const getUserMutation = useMutation({
    mutationFn: profileService.getProfile,
    onSuccess: (res) => {
      setUser(res.data);
    }
  });

  React.useEffect(() => {
    const initializeAuth = async () => {
      const accessToken = localStorage.load("accessToken");
      const refreshToken = localStorage.load("refreshToken");

      if (pathname === "/admin" && !refreshToken) {
        router.push("/unauthorized");
        return;
      }

      if ((pathname === "/login" || pathname === "/signup") && accessToken) {
        router.push("/");
        return;
      }

      if (!accessToken && refreshToken) {
        refreshToken();
        return;
      }

      if (!user && accessToken) {
        getUserMutation.mutate();
        return;
      }

      setIsLoading(false);
    };

    initializeAuth();
  }, [user, router, getUserMutation, pathname]);

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (res) => {
      const { access, refresh } = res.data.tokens;
      const { role } = res.data.user;

      localStorage.save("user", res.data.user);
      localStorage.save("accessToken", access.token);
      localStorage.save("refreshToken", refresh.token);
      queryClient.invalidateQueries({ queryKey: ["user"] });

      if (role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    },
    onError: (error) => {
      console.error("Login error:", error);
    }
  });

  const refreshTokenMutation = useMutation({
    mutationFn: authService.refreshToken,
    onSuccess: (res) => {
      const { access } = res.data.tokens;
      localStorage.save("accessToken", access.token);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      console.error("Token refresh error:", error);
      logout();
    }
  });

  const signupMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (res) => {
      const { access, refresh } = res.data.tokens;

      localStorage.save("user", res.data.user);
      localStorage.save("accessToken", access.token);
      localStorage.save("refreshToken", refresh.token);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    }
  });

  const login = (credentials: App.Services.AuthService.LoginCredentials) => {
    return loginMutation.mutateAsync(credentials);
  };

  const signup = (
    credentials: App.Services.AuthService.RegisterCredentials
  ) => {
    return signupMutation.mutateAsync(credentials);
  };

  const logout = () => {
    localStorage.delete("accessToken");
    localStorage.delete("refreshToken");
    queryClient.clear();
  };

  const refreshToken = () => {
    const refreshToken = localStorage.load("refreshToken");
    if (refreshToken) {
      return refreshTokenMutation.mutateAsync({ refreshToken });
    }
  };

  const value = {
    user,
    isLoading: isLoading || loginMutation.isPending,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    refreshToken,
    loginError: loginMutation.error,
    isLoginLoading: loginMutation.isPending
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </QueryClientProvider>
  );
};
