import { Order } from './orders.model.js';

export class OrderServices {
  static async createOrder(data) {
    return await Order.create(data);
  }

  static async findAll() {
    return await Order.findAll();
  }

  static async findOne(id) {
    return await Order.findOne({
      where: {
        id,
        status: 'active',
      },
    });
  }

  static async updateOrder(order) {
    return await order.update({
      status: 'completed',
    });
  }

  static async cancelOrder(order) {
    return await order.update({
      status: 'cancelled',
    });
  }
}
