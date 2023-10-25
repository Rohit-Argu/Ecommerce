import { OrdersModel } from "src/app/shared/model/orders.model";

export class OrdersService{
    orders:OrdersModel[]=[{
        numberOfItems:2,
        totalPrice:2500,
        deliveryStatus: "Out For Delivery",
        show:false
      },
      {
        numberOfItems:4,
        totalPrice:4700,
        deliveryStatus: "Delivered",
        show:false
      },
      {
        numberOfItems:1,
        totalPrice:1200,
        deliveryStatus: "Delivered",
        show:false
      }];
      getOrders(){
        return this.orders.slice();
      }
}