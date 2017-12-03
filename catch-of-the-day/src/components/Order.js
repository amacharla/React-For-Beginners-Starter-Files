import React from 'react';
import { formatPrice } from '../helpers';

class Order extends React.Component {
  render() {
    const { fishes, order} = this.props;
    const orderIds = Object.keys(order);

    const total = orderIds.reduce((prevTotal, key) => {
      const fish = fishes[key];
      const count = order[key];
      const isAvailable = fish && fish.status === 'available';

      if(isAvailable) { return prevTotal + (count * fish.price || 0) }
    }, 0);

   return (
     <div className="order-wrap">
       <h2>Your Order</h2>
       <ul className="order">
       {orderIds}
         <li className="total">
          <strong>Total:</strong>
          {formatPrice(total)}
         </li>
       </ul>
     </div>
    )
  }
}

export default Order;
