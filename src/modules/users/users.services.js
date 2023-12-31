import { Meal } from '../meals/meals.model.js';
import { Order } from '../orders/orders.model.js';
import { Restaurant } from '../restaurant/resaturant.model.js';
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

  static async updateUser(user, data) {
    return await user.update(data);
  }

  static async deleteUser(user) {
    return await user.update({
      status: false,
    });
  }

  static async findAllOrders(userId) {
    return await Order.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Meal,
          attributes: ['name'],
          include: [
            {
              model: Restaurant,
              attributes: ['name'],
            },
          ],
        },
      ],
    });
  }
}
