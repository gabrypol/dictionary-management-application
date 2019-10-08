import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./Dict.css";

class Dict extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      dictionary: this.props.dictionary, 
    };
    this.handleRemove = this.handleRemove.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleRemove() {
    this.props.removeDictionary(this.props.id);
  }

  toggleForm() {
    this.setState({ isEditing: !this.state.isEditing });
  }

  handleUpdate(evt) {
    evt.preventDefault();
    //take new dictionary and pass it up to parent
    this.props.updateDictionary(this.props.id, this.state.dictionary);
    this.setState({ isEditing: false });
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }
 
  render() {
    const { dictionary } = this.state;
    const isEnabled = dictionary.length > 0;
    let result;
    if (this.state.isEditing) {
      result = (
          <form className='Dict-edit-form' onSubmit={this.handleUpdate}>
            <label htmlFor='dictionary'>Rename dictionary:</label>
            <input
              type='text'
              value={this.state.dictionary}
              id='dictionary'
              name='dictionary'
              onChange={this.handleChange}
            />
            <button disabled={!isEnabled}>Save</button>
          </form>
      );
    } else {
      result = (
          <li className='Dict-row'>
            {this.props.dictionary}
          </li>
      );
    }

    return (
      <div className='Dict'>
        {result}
        <div className='Dict-buttons'>
          <button onClick={this.toggleForm}>
            <FontAwesomeIcon icon="pen"/>
          </button>
          <button onClick={this.handleRemove}>
            <FontAwesomeIcon icon="trash"/>
          </button>
        </div>
      </div>
    );
  }
}

export default Dict;
