declare namespace App.Services.ProfileService {
  type UpdateProfilePayload = {
    name?: string;
    email?: string;
  };

  type ChangePasswordPayload = {
    password: string;
  };

  type RequestModeratorPayload = {
    reason: string;
    experience?: string;
  };

  type getProfile = () => Response<App.Types.User.UserResponse>;
  type updateProfile = (payload: UpdateProfilePayload) => Response<App.Types.User.UserResponse>;
  type changePassword = (payload: ChangePasswordPayload) => Response<void>;
  type forgotPassword = (email: string) => Response<void>;
  type resetPassword = (token: string, password: string) => Response<void>;
  type sendVerificationEmail = () => Response<void>;
  type verifyEmail = (token: string) => Response<void>;
  type requestModerator = (payload: RequestModeratorPayload) => Response<void>;
}