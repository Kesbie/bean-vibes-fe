import BaseService from "../base";

class UserService extends BaseService {
  #END_POINT = '/users'

  getUser: App.Services.UserService.GetUser = async (id: string) => {
    const response = await this.axios.get(`${this.#END_POINT}/${id}`);
    return response.data;
  }
}


export default UserService;