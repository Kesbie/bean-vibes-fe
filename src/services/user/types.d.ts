declare namespace App.Services.UserService {
  type GetUser = (id: string) => Promise<App.Types.User.User>;
}