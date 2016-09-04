import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

class Search extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if (this.getSearchValue().length > 0 && (event.keyCode === 13 || event.type === 'click')) {
      this.props.onChange(this.getSearchValue());
    }
  }

  getSearchValue() {
    return findDOMNode(this.refs.search).value;
  }

  render() {
    return (
      <div>
        <input type="text" onKeyUp={this.handleChange} ref="search"/>
        <button onClick={this.handleChange}>Search</button>
      </div>
    )
  }
}

export default Search;