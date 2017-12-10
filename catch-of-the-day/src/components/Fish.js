import React from 'react';
import { formatPrice } from '../helpers';

/**
 * Fish component that shows info about fish.
 * @extends React
 */
class Fish extends React.Component {
  render (){
    // dont have to constantly say this.props.details.____
    //const details = this.props.details; // == const {details} = this.props;
    const {details, index} = this.props;
    const isAvailable = details.status === 'available';
    return (
      <li className="menu-fish">
        <img src={details.image} alt={details.name} />
        <h3 className="fish-name">{details.name}
          <span className="price">{formatPrice(details.price)}</span>
        </h3>
        <p>{details.desc}</p>
        <button disabled={!isAvailable} onClick={() => this.props.addToOrder(index)}>
          { isAvailable ? 'Add To Order' : 'Sold Out!' }
        </button>
      </li>
    )
  }
}

export default Fish;
