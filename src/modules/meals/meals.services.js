import { Meal } from './meals.model.js';

export class MealsServices {
  static async createMeals(data) {
    return await Meal.create(data);
  }
  static async findAll() {
    return await Meal.findAll({
      where: {
        status: true,
      },
    });
  }

  static async findOne(id) {
    return await Meal.findOne({
      where: {
        id,
        status: true,
      },
    });
  }

  static async update(meal, data) {
    return await meal.update(data);
  }

  static async delete(meal) {
    return await meal.update({
      status: false,
    });
  }
}
