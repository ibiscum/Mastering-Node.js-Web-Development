import { Order } from "./order_models.js";

export interface OrderRepository {
  getOrder(id: number): Promise<Order | null>;

  getOrders(excludeShipped: boolean): Promise<Order[]>;

  storeOrder(order: Order): Promise<Order>;
}
