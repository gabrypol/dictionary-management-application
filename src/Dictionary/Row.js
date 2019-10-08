import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./Row.css";

class Row extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      domain: this.props.domain, 
      range: this.props.range
    };
    this.handleRemove = this.handleRemove.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleRemove() {
    this.props.removeRow(this.props.id);
  }

  toggleForm() {
    this.setState({ isEditing: !this.state.isEditing });
  }

  handleUpdate(evt) {
    evt.preventDefault();
    //take new domain and range and pass them up to parent
    this.props.updateRow(this.props.id, this.state.domain, this.state.range);
    this.setState({ isEditing: false });
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }
 
  render() {
    const { domain, range } = this.state;
    const isEnabled = domain.length > 0 && range.length > 0;
    let result;
    if (this.state.isEditing) {
      result = (
          <form className='Row-edit-form' onSubmit={this.handleUpdate}>
            <label htmlFor='domain'>Edit domain:</label>
            <input
              type='text'
              value={this.state.domain}
              id='domain'
              name='domain'
              onChange={this.handleChange}
            />
            <label htmlFor='range'>Edit range:</label>
            <input
              type='text'
              value={this.state.range}
              id='range'
              name='range'
              onChange={this.handleChange}
            />
            <button disabled={!isEnabled}>Save</button>
          </form>
      );
    } else {
      result = (
          <li className='Row-row'>
            <div>Domain: <span>{this.props.domain}</span></div>
            <div>Range: <span>{this.props.range}</span></div>
          </li>
      );
    }

    return (
      <div className='Row'>
        {result}
        <div className='Row-buttons'>
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

export default Row;

