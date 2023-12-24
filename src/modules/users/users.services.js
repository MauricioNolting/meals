import { User } from './user.model.js';

export class UserService {
  static async create(data) {
    return await User.create(data);
  }

  static async findOneByEmail(email) {
    return await User.findOne({
      where: {
        status: true,
        email,
      },
    });
  }

  static async findOne(id) {
    return await User.findOne({
      where: {
        status: true,
        id,
      },
    });
  }
}
