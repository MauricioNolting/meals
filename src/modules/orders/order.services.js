import { Order } from './orders.model.js';

export class OrderServices {
  static async createOrder(data) {
    return await Order.create(data);
  }
}
