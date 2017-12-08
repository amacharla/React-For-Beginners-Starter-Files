import React from 'react';
import { formatPrice } from '../helpers';

class Order extends React.Component {

  constructor () {
    super();
    this.renderOrder = this.renderOrder.bind(this);
  }

  /**
   * Render function that renders list items fishname and price
   * @param  {string} key [unique identifier for listitem `fist-timestamp`]
   * @return {html element <li>} [lbs FishName $FishPrice]
   */
  renderOrder(key) {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const removeButton =
    <button onClick={() => this.props.removeOrder(key)}>&times;</button>

    if(!fish || fish.status === 'unavailable') {
      return (
        <li key={key}>
          Sorry, {fish ? fish.name : 'fish'} is no longer available! {removeButton}
      </li>
      )
    }
    // ELSE Print price
    return(
      <li key={key}>
        <span>{count}lbs {fish.name} {removeButton}</span>
        <span className="price">{formatPrice(count * fish.price)}</span>
      </li>
    )
  }

  render() {
    const { fishes, order} = this.props;
    const orderIds = Object.keys(order);

    const total = orderIds.reduce((prevTotal, key) => { // wtf is reduce doing!?
      const fish = fishes[key];
      const count = order[key];
      const isAvailable = fish && fish.status === 'available';

      if(isAvailable) { return prevTotal + (count * fish.price || 0) }
    }, 0);

   return (
     <div className="order-wrap">
       <h2>Your Order</h2>
       <ul className="order">
         {orderIds.map(this.renderOrder)}
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
