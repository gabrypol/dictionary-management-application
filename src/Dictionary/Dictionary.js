import React, { Component } from "react";
import NewRowForm from "./NewRowForm";
import Row from "./Row";
import "./Dictionary.css";

class Dictionary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: []
    };
    this.create = this.create.bind(this);
    this.remove = this.remove.bind(this);
    this.update = this.update.bind(this);
    this.validate = this.validate.bind(this);
    this.hasDuplicates = this.hasDuplicates.bind(this);
    this.hasChain = this.hasChain.bind(this);
    this.storeRowInLocalStorage = this.storeRowInLocalStorage.bind(this);
    this.removeRowFromLocalStorage = this.removeRowFromLocalStorage.bind(this);
    this.updateRowInLocalStorage = this.updateRowInLocalStorage.bind(this);
  }

  componentDidMount = () => {
    let rows = JSON.parse(localStorage.getItem('rows')) || [];
    this.setState({ rows }, this.validate);
  }

  storeRowInLocalStorage(row) {
    let rows;
    if (localStorage.getItem('rows') === null) {
      rows = [];
    } else {
      rows = JSON.parse(localStorage.getItem('rows'));
    }
    rows.push(row);

    localStorage.setItem('rows', JSON.stringify(rows));
  }

  removeRowFromLocalStorage(idRowToRemove) {
    let rows;
    if(localStorage.getItem('rows') === null) {
      rows = [];
    } else {
      rows = JSON.parse(localStorage.getItem('rows'));
    }

    rows.forEach((row, index) => {
        if(idRowToRemove === row.id) {
          rows.splice(index, 1);
        }
    });

    localStorage.setItem('rows', JSON.stringify(rows));
  }

  updateRowInLocalStorage(idRowToUpdate, updatedDomain, updatedRange) {
    let rows;
    if(localStorage.getItem('rows') === null) {
      rows = [];
    } else {
      rows = JSON.parse(localStorage.getItem('rows'));
    }

    rows.forEach((row, index) => {
        if(idRowToUpdate === row.id) {
          rows.splice(index, 1, {domain: updatedDomain, range: updatedRange, id: idRowToUpdate});
        }
    });

    localStorage.setItem('rows', JSON.stringify(rows));
  }

  create(newRow) {
    this.setState({
      rows: [...this.state.rows, newRow]
    }, () => {
      this.storeRowInLocalStorage(newRow);
      this.validate();
  })};

  remove(id) {
    this.setState({
      rows: this.state.rows.filter(row => row.id !== id)
    }, () => {
      this.removeRowFromLocalStorage(id);
      this.validate();
  })};

  update(id, updatedDomain, updatedRange) {
    const updatedRows = this.state.rows.map(row => {
      if (row.id === id) {
        return { ...row, domain: updatedDomain, range: updatedRange };
      }
      return row;
    });
    this.setState({ rows: updatedRows }, () => {
      this.updateRowInLocalStorage(id, updatedDomain, updatedRange);
      this.validate();
  })};
    
  // Validation
  validate() {
    let domainArray = this.state.rows.map(el => el.domain);
    let rangeArray = this.state.rows.map(el => el.range);
    
    this.setState({
      domainArray: domainArray, 
      rangeArray: rangeArray,
      
    }, () => this.setState({
      domainHasDuplicates: this.hasDuplicates(domainArray),
      rangeHasDuplicates: this.hasDuplicates(rangeArray),
      hasChain: this.hasChain(domainArray), 
      hasCycle: this.hasCycle(domainArray)
    }))
  }

  hasDuplicates = array => {
    return (new Set(array)).size !== array.length;
  }

  hasChain = array => {
    for (let i = 0; i < array.length; i++) {
      if(this.state.rangeArray.includes(array[i])) {
        return true;
      }
    }
  }

  hasCycle = array => {
    for (let i = 0; i < array.length; i++) {
      if(this.state.rangeArray.includes(array[i]) && this.state.rangeArray[i] === array[this.state.rangeArray.indexOf(array[i])]) {
        return true;
      }
    }
  }

  render() {
    let domainHasDuplicates = this.state.domainHasDuplicates;
    let rangeHasDuplicates = this.state.rangeHasDuplicates;
    let hasChain = this.state.hasChain;
    let hasCycle = this.state.hasCycle;
    let result;
    if (domainHasDuplicates && rangeHasDuplicates) {
      result = <p>This dictionary has at least one DUPLICATE!</p>
    } else if (domainHasDuplicates && !rangeHasDuplicates) {
      result = <p>This dictionary has at least one FORK!</p>
    } else if (hasChain) {
      result = <p>This dictionary has at least one CHAIN!</p>
      if (hasCycle) {
        result = <p>This dictionary has at least one CYCLE!</p>
      }
    } 
    
    const rows = this.state.rows.map(row => {
      return (
          <Row
            key={row.id}
            id={row.id}
            domain={row.domain}
            range={row.range}
            removeRow={this.remove}
            updateRow={this.update}
          />
      );
    });

    return (
      <div className='Dictionary'>
        <h1>Dictionary <span>xyz</span></h1>
        <ul>
          {rows}
        </ul>
        <NewRowForm createRow={this.create} />
        <br/>
        {result}
      </div>
    );
  }
}

export default Dictionary;


