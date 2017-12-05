import React from 'react';
import { getFunName } from '../helpers';

/**
 * Storename > storeId > URI
 * @extends React
 */
class StorePicker extends React.Component {

  /**
   * Transitions to App
   * @param  {Listener} event [onSubmit]
   */
  gotToStore(event) {
    event.preventDefault(); // prevent the default action of js -refreshing
    const storeId = this.storeInput.value; //getting value from input
    this.context.router.transitionTo(`/store/${storeId}`); //transitiong and setting the uid as value
    // pay attention to ` above, its not ' !!!
  }

  render() {
    return (
      <form className="store-selector" onSubmit={this.gotToStore.bind(this)}>
        <h2>Please Enter A Store</h2>
        <input type="text" required placeholder="Store Name"
          defaultValue={getFunName()} ref={(input) => { this.storeInput = input }}/>
        <button type="submit">Visit Store -></button>
      </form>
    )
  }
}

StorePicker.contextTypes = {  //access the router object
  router: React.PropTypes.object
}

export default StorePicker;
