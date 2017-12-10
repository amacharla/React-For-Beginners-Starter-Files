import React from 'react';

/**
 * Creates new fish
 * @extends React
 */
class AddFishForm extends React.Component {

  /**
   * creates a new fish object from given information input from form
   * @param  {listener} event [onSubmit listener?]
   * @return {object} [creates a `fish` object with respective info]
   */
  createFish(event) {  // create a fish object from the input
    event.preventDefault();
    const fish = {
    name: this.name.value,
    price: this.price.value,
    status: this.status.value,
    desc: this.desc.value,
    image: this.image.value
    }
    this.props.addFish(fish);
    this.fishform.reset(); //java script reset to clear the FORM after submit
  }

  render () {
    return (
      <form ref={(input) => this.fishform = input} className="fish-edit" onSubmit={this.createFish.bind(this)}>
        <input ref={(input) => this.name = input} type="text" placeholder="Fish Name " />
        <input ref={(input) => this.price = input} type="text" placeholder="Fish Price" />
        <select ref={(input) => this.status = input}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea ref={(input) => this.desc = input} type="text" placeholder="Fish Description"></textarea>
        <input ref={(input) => this.image = input} type="text" placeholder="Fish Image" />
        <button type="submit">+ Add Item</button>
      </form>
    )
  }
}

AddFishForm.propTypes = {
  addFish: React.PropTypes.func.isRequired
}

export default AddFishForm;
