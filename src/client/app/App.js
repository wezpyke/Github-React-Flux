import React, { Component, PropTypes } from 'react';
import Search from './components/Search';
import { requestRepos } from './actions/RepoActions';
import RepoStore from './stores/RepoStore'
import Repos from './components/Repos';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange(val) {
    this.setState({repos: RepoStore.getRepos()});
  }

  doSearch(val) {
    requestRepos(val);
  }

  componentWillMount() {
    this.setState({repos: null, searchTerm: null});
    RepoStore.addChangeListener( this.handleSearchChange )
  }

  componentWillUnmount() {
    RepoStore.removeChangeListener( this.handleSearchChange )
  }

  render() {
    return (
      <div>
        <Search onChange={this.doSearch} searchTerm={this.state.searchTerm}/>
        <Repos repos={this.state.repos}/>
      </div>
    );
  }
}