declare namespace App.Services.AuthService {

  type RefreshTokenPayload = {
    refreshToken: string;
  }

  type LoginCredentials = {
    email: string;
    password: string;
  }

  type RegisterCredentials = {
    email: string;
    password: string;
    name: string;
  }

  type LoginResponse = {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
      isEmailVerified: boolean;
    };
    tokens: {
      access: {
        token: string;
        expires: Date;
      };
      refresh: {
        token: string;
        expires: Date;
      };
    };
  }

  type RegisterResponse = {
    user: App.Types.User.UserResponse;
    tokens: {
      access: {
        token: string;
        expires: Date;
      };
      refresh: {
        token: string;
        expires: Date;
      };
    };
  }

  type RefreshTokenResponse = {
    tokens: {
      access: {
        token: string;
        expires: Date;
      };
    };
  }

  type VerifyEmailResponse = {
    message: string;
    user: App.Types.User.UserResponse;
  }

  type SendVerifyEmailResponse = object

  type Login = (credentials: LoginCredentials) => Promise<App.Services.Response<LoginResponse>>;
  type Register = (credentials: RegisterCredentials) => Promise<App.Services.Response<RegisterResponse>>;
  type Logout = () => Promise<void>;
  type RefreshToken = (payload: RefreshTokenPayload) => Promise<App.Services.Response<RefreshTokenResponse>>;
  type VerifyEmail = (token: string) => Promise<App.Services.Response<VerifyEmailResponse>>;
  type SendVerifyEmail = () => Promise<App.Services.Response<SendVerifyEmailResponse>>;
}