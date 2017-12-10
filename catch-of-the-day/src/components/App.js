import React from 'react';
import Header from './Header';
import Fish from './Fish';
import Order from './Order';
import Inventory from './Inventory';
import base from '../base';
import sampleFishes from '../sample-fishes';

/**
 * MAIN CLASS which is responsible State managemnt and Application layout
 * @extends React
 */
class App extends React.Component {

  /**
   * Enables binding to `this` when super is called
   * @return {JavaScript} [renders to DOM]
   */
  constructor() {
    super(); //cannot use `this` unless super is called
    this.addFish = this.addFish.bind(this); // addFish can access
    this.loadSamples = this.loadSamples.bind(this); // addFish can access
    this.addToOrder = this.addToOrder.bind(this); // addFish can access
    this.removeOrder = this.removeOrder.bind(this); // addFish can access
    this.updateFish = this.updateFish.bind(this); // addFish can access
    this.removeFish = this.removeFish.bind(this); // addFish can access
    // initial state
    this.state = {
      fishes: {},
      order: {}
    };
  }

  /**
   * Allow App Component to sync with firebase state before rendering
   * Runs right before <App> is rendered
   */
  componentWillMount() {
   // ref is used to access binding later in Unmount
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });

    //check if there is any order in LocalStorage
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);
    if(localStorageRef) {
      //if there is stuff in local storage then update State with orders
      this.setState({ order: JSON.parse(localStorageRef) });
    }
  }

  /**
   * Stop syncing when storeId is changed by unbinding
   */
  componentWillUnmount() { base.removeBinding(this.ref); }

  /**
   * Runs everytime when a state or props is updated
   * @param  {object} nextProps [access to Apps's props]
   * @param  {object} nextState [access to Apps's State]
   */
  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(  //adds order to browsers local storage
      `order-${nextProps.params.storeId}`, //key: order-storeId
      JSON.stringify(nextState.order));     //value: {fish-timestampt: count}
  }

  /**
   * adds fish object to fishes obj dict and updates state with new fish
   * @param {Ojbect} fish [desc, img, name, price, status]
   */
  addFish(fish) {
    //update our state
    const fishes = {...this.state.fishes}; //unpacks and makes a copy of fishes state
    //add in our new fish
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish; // set key to be fish-TIMESTAMP & value to new ==fish obj==
    //set state
    this.setState({ fishes: fishes }); // same as { fishes } -ES6
  }

  updateFish(key, updatedFish) {
    const fishes = {...this.state.fishes};
    // update dict with old attr + changed attr
    fishes[key] = updatedFish;
    // tell React of the change
    this.setState({ fishes });
  }

  removeFish(key) {
    const fishes = {...this.state.fishes};
    //delete fishes[key]; CANT NOT DO THIS BECAUSE OF FIREBASE
    fishes[key] = null;
    // tell React of the change
    this.setState({ fishes });
  }

  /**
   * loads fish objects from file when button is clicked
   * updates state with sample fishes
   */
  loadSamples() {
    this.setState(
      {fishes: sampleFishes}
    );
  }

  /**
   * keeps track of fishes ordered
   * @param {string} key [name of the unique fish]
   */
  addToOrder(key) {
    //make a copy of the object dict
    const order = {...this.state.order};
    //update or add the new quantity of fish
    order[key] = order[key] + 1 || 1;
    //update our state
    this.setState({ order }); //same as ({ order : order}) -ES6
  }

  removeOrder(key) {
    //make a copy of the object dict
    const order = {...this.state.order};
    //update or remove the a fish
    delete order[key];

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
      <Order fishes={this.state.fishes} order={this.state.order} removeOrder={this.removeOrder}/>
      <Inventory addFish={this.addFish} loadSamples={this.loadSamples} fishes={this.state.fishes} updateFish={this.updateFish} removeFish={this.removeFish}/>
    </div>
    )
  }
}

App.propTypes = {
  params: React.PropTypes.object.isRequired
}

export default App;
