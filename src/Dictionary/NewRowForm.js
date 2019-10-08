import React, { Component } from "react";
import uuid from "uuid/v4";
import "./NewRowForm.css";

class NewRowForm extends Component {
  constructor(props) {
    super(props);
    this.state = { domain: "", range: ""};
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
    this.props.createRow({ ...this.state, id: uuid()});
    this.setState({ domain: "", range: "" });
  }
  
  render() {
    const { domain, range } = this.state;
    const isEnabled = domain.length > 0 && range.length > 0;
    return (
      <form className='NewRowForm' onSubmit={this.handleSubmit}>
        <p>ADD NEW ROW:</p>
        <input
          type='text'
          placeholder='Insert domain...'
          id='domain'
          name='domain'
          value={this.state.domain}
          onChange={this.handleChange}
        />
        
        <input
          type='text'
          placeholder='Insert range...'
          id='range'
          name='range'
          value={this.state.range}
          onChange={this.handleChange}
        />
        <button disabled={!isEnabled}>Add</button>
      </form>
    );
  }
}

export default NewRowForm;