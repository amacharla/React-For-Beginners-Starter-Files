import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

class App extends React.Component {
  constructor() {
    super();
    this.addFish = this.addFish.bind(this); // addFish can access
    // get initial state
    this.state = {
      fishes: {},
      order: {}
    };
  }

  addFish(fish) {
    //update our state
    const fishes = {...this.state.fishes}; //unpacks and makes a copy of fishes object
    //add in our new fish
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish; // set key to be fish-TIMESTAMP & value to new ==fish obj==
    //set state
    this.setState({ fishes }); // same as {fishes: fishe}
  }

  render() {
    return (
    <div className="catch-of-the-day">
      <div className="menu">
        <Header tagline="Fresh Seafood Market" />
      </div>
      <Order />
      <Inventory />
    </div>
    )
  }
}

export default App;
