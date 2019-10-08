import React, { Component } from "react";
import uuid from "uuid/v4";
import "./NewDictionaryForm.css";

class NewDictionaryForm extends Component {
  constructor(props) {
    super(props);
    this.state = { dictionary: ""};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.createDictionary({ ...this.state, id: uuid()});
    this.setState({ dictionary: ""});
  }
  
  render() {
    const { dictionary } = this.state;
    const isEnabled = dictionary.length > 0;
    return (
      <form className='NewDictionaryForm' onSubmit={this.handleSubmit}>
        <label htmlFor='dictionary'>ADD NEW DICTIONARY:</label>
        <input
          type='text'
          placeholder='Insert name...'
          id='dictionary'
          name='dictionary'
          value={this.state.dictionary}
          onChange={this.handleChange}
        />
        <button disabled={!isEnabled}>Add</button>
      </form>
    );
  } 
}

export default NewDictionaryForm;