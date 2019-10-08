import React, { Component } from "react";
import NewDictionaryForm from "./NewDictionaryForm";
import Dict from "./Dict";
import "./ListOfDictionaries.css";

class ListOfDictionaries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dictionaries: []
    };
    this.create = this.create.bind(this);
    this.remove = this.remove.bind(this);
    this.update = this.update.bind(this);
    this.storeDictionaryInLocalStorage = this.storeDictionaryInLocalStorage.bind(this);
    this.removeDictionaryFromLocalStorage = this.removeDictionaryFromLocalStorage.bind(this);
    this.updateDictionaryInLocalStorage = this.updateDictionaryInLocalStorage.bind(this);
  }

  componentDidMount = () => {
    let dictionaries = JSON.parse(localStorage.getItem('dictionaries')) || [];
    this.setState({ dictionaries });
  }

  storeDictionaryInLocalStorage(dictionary) {
    let dictionaries;
    if (localStorage.getItem('dictionaries') === null) {
      dictionaries = [];
    } else {
      dictionaries = JSON.parse(localStorage.getItem('dictionaries'));
    }
    dictionaries.push(dictionary);

    localStorage.setItem('dictionaries', JSON.stringify(dictionaries));
  }

  removeDictionaryFromLocalStorage(idDictionaryToRemove) {
    let dictionaries;
    if(localStorage.getItem('dictionaries') === null) {
      dictionaries = [];
    } else {
      dictionaries = JSON.parse(localStorage.getItem('dictionaries'));
    }

    dictionaries.forEach((dictionary, index) => {
        if(idDictionaryToRemove === dictionary.id) {
          dictionaries.splice(index, 1);
        }
    });

    localStorage.setItem('dictionaries', JSON.stringify(dictionaries));
  }

  updateDictionaryInLocalStorage(idDictionaryToUpdate, updatedDictionary) {
    let dictionaries;
    if(localStorage.getItem('dictionaries') === null) {
      dictionaries = [];
    } else {
      dictionaries = JSON.parse(localStorage.getItem('dictionaries'));
    }

    dictionaries.forEach((dictionary, index) => {
        if(idDictionaryToUpdate === dictionary.id) {
          dictionaries.splice(index, 1, {dictionary: updatedDictionary, id: idDictionaryToUpdate});
        }
    });

    localStorage.setItem('dictionaries', JSON.stringify(dictionaries));
  }


  create(newDictionary) {
    this.setState({
      dictionaries: [...this.state.dictionaries, newDictionary]
    }, this.storeDictionaryInLocalStorage(newDictionary))
  }

  remove(id) {
    this.setState({
      dictionaries: this.state.dictionaries.filter(dictionary => dictionary.id !== id)
    }, this.removeDictionaryFromLocalStorage(id));
  }

  update(id, updatedDictionary) {
    const updatedDictionaries = this.state.dictionaries.map(dictionary => {
      if (dictionary.id === id) {
        return { ...dictionary, dictionary: updatedDictionary};
      }
      return dictionary;
    });
    this.setState({ dictionaries: updatedDictionaries }, this.updateDictionaryInLocalStorage(id, updatedDictionary));
  }
  
  render() {
    const dictionaries = this.state.dictionaries.map(dictionary => {
      return (
          <Dict
            key={dictionary.id}
            id={dictionary.id}
            dictionary={dictionary.dictionary}
            removeDictionary={this.remove}
            updateDictionary={this.update}
          />
      );
    });

    return (
      <div className='ListOfDictionaries'>
        <h1>List of <span>Dictionaries</span></h1>
        <ul>
          {dictionaries}
        </ul>
        <NewDictionaryForm createDictionary={this.create} />
      </div>
    );
  }
}

export default ListOfDictionaries;
