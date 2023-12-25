import { Restaurant } from './resaturant.model.js';
import { Review } from './reviews.model.js';

export class RestaurantServices {
  static async createRestaurant(data) {
    return await Restaurant.create(data);
  }

  static async createReview(data) {
    return await Review.create(data);
  }

  static async findOneRestaurant(id) {
    return await Restaurant.findOne({
      where: {
        id,
        status: true,
      },
    });
  }
}
