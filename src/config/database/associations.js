import { Meal } from '../../modules/meals/meals.model.js';
import { Order } from '../../modules/orders/orders.model.js';
import { Restaurant } from '../../modules/restaurant/resaturant.model.js';
import { Review } from '../../modules/restaurant/reviews.model.js';
import { User } from '../../modules/users/user.model.js';

export const initModel = () => {
  User.hasMany(Order);
  Order.belongsTo(User);

  Meal.hasOne(Order);
  Order.belongsTo(Meal);

  Restaurant.hasMany(Meal);
  Meal.belongsTo(Restaurant);

  Restaurant.hasMany(Review);
  Review.belongsTo(Restaurant);

  User.hasMany(Review);
  Review.belongsTo(User);
};
