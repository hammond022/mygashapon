import axios from "axios";
const url = "http://localhost:5001/api/users/";

class UserService {
  // GET user

  static async getUser(userId) {
    const res = await axios.get(`${url}${userId}`);
    return res.data;
  }

  static async findUsername(username) {
    const res = await axios.get(`${url}find/${username}`);
    return res.data;
  }
}

export default UserService;
