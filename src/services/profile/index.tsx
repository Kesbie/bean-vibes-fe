import BaseService from "../base";

class ProfileService extends BaseService {
  #END_POINT = "/profile";

  getProfile = async () => {
    const response = await this.axios.get(`${this.#END_POINT}`);
    return response.data;
  };
}

export default ProfileService;