import React from 'react';
import AddFishForm from './AddFishForm';

/**
 * Allows adding new fish items
 * Loads sample fishes with button
 * @extends React
 */
class Inventory extends React.Component {
  render () {
    return (
      <div>
        <h2>Inventory</h2>
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSamples}>Load Fishes</button>
      </div>
    )
  }
}

export default Inventory;
