declare namespace App.Types.User {
  type UserResponse = App.Types.Base.BaseResponse & {
    email: string;
    name: string;
    role?: string;
    isEmailVerified?: boolean;
    favorites?: string[];
    isBanned?: boolean;
    isActive?: boolean;
  };

  type UserCreate = {
    email: string;
    name: string;
    role: string;
  };
}