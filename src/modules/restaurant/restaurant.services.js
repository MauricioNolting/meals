import { Order } from '../orders/orders.model.js';
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

  static async findOneRestaurnt(id) {
    return await Restaurant.findOne({
      where: {
        id,
        status: true,
      },
    });
  }

  static async updateRestaurant(restaurant, data) {
    return await restaurant.update(data);
  }

  static async findOneRestaurantByName(name) {
    return await Restaurant.findOne({
      where: {
        name,
        status: true,
      },
    });
  }

  static async findAllRestaurants() {
    return await Restaurant.findAll({
      where: {
        status: true,
      },
    });
  }

  static async updateReview(review, data) {
    return await review.update(data);
  }

  static async findAllOrders(review, data) {
    return await Order.findAll();
  }
}
