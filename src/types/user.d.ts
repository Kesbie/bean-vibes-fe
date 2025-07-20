declare namespace App.Types.User {
  type UserResponse =  {
    id: string;
    email: string;
    name: string;
    role: string;
    isEmailVerified: boolean;
    favorites: string[];
    isBanned: boolean;
    isActive: boolean;
  };

  type UserCreate = {
    email: string;
    name: string;
    role: string;
  };
}