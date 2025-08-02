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

  type RegisterResponse = {
    code: number;
    data: {
      user: App.Types.User.UserResponse;
      tokens: RefreshTokenResponse;
    };
    message: string;
  }

  type RefreshTokenResponse = {
    access: {
      token: string;
      expires: Date;
    };
    refresh: {
      token: string;
      expires: Date;
    };
  }

  type VerifyEmailResponse = {
    message: string;
    user: App.Types.User.UserResponse;
  }

  type SendVerifyEmailResponse = object

  type login = (credentials: LoginCredentials) => Response<LoginResponse>;
  type register = (credentials: RegisterCredentials) => Response<RegisterResponse>;
  type logout = () => Response<void>;
  type refreshToken = (payload: RefreshTokenPayload) => Response<RefreshTokenResponse>;
  type verifyEmail = (token: string) => Response<VerifyEmailResponse>;
  type sendVerifyEmail = (id: string) => Response<SendVerifyEmailResponse>;
}