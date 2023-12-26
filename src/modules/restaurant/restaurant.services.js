import { User } from '../users/user.model.js';
import { Restaurant } from './resaturant.model.js';
import { Review } from './reviews.model.js';

export class RestaurantServices {
  static async createRestaurant(data) {
    return await Restaurant.create(data);
  }

  static async findOneReview(id) {
    return await Review.findOne({
      where: {
        id,
        status: true,
      },
      include: [
        {
          model: User,
        },
      ],
    });
  }

  static async createReview(data) {
    return await Review.create(data);
  }

  static async findOneRestaurant(resId) {
    return await Restaurant.findOne({
      where: {
        id: resId,
        status: true,
      },
    });
  }

  static async findOneRestaurantByName(name) {
    return await Restaurant.findOne({
      where: {
        name,
        status: true,
      },
    });
  }
}
