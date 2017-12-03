import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';

class App extends React.Component {
  constructor() {
    super(); //cannot use `this` unless super is called
    this.addFish = this.addFish.bind(this); // addFish can access
    this.loadSamples = this.loadSamples.bind(this); // addFish can access
    this.addToOrder = this.addToOrder.bind(this); // addFish can access
    // initial state
    this.state = {
      fishes: {},
      order: {}
    };
  }

  addFish(fish) {
    //update our state
    const fishes = {...this.state.fishes}; //unpacks and makes a copy of fishes state
    //add in our new fish
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish; // set key to be fish-TIMESTAMP & value to new ==fish obj==
    //set state
    this.setState({ fishes: fishes }); // same as { fishes } -ES6
  }

  loadSamples() {
    this.setState(
      {fishes: sampleFishes}
    );
  }

  addToOrder(key) {
    //make a copy of the object dict
    const order = {...this.state.order};
    //update or add the new quantity of fish
    order[key] = order[key] + 1 || 1;
    //update our state
    this.setState({ order }); //same as ({ order : order}) -ES6
  }

  render() {
    return (
    <div className="catch-of-the-day">
      <div className="menu">
        <Header tagline="Fresh Seafood Market" />
        <ul className="list-of-fishes">
          {Object.keys(this.state.fishes).map(key =>
             <Fish key={key} index={key} details={this.state.fishes[key]}  addToOrder={this.addToOrder} />)}
        </ul>
      </div>
      <Order fishes={this.state.fishes} order={this.state.order}/>
      <Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
    </div>
    )
  }
}

export default App;
