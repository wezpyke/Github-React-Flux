import React, { Component } from 'react';
import RepoItem from './RepoItem';

export default class Repos extends Component {

  renderReposList() {
    if (this.props.repos) {
      return (<div>
        {Object.keys(this.props.repos).map((repo) => {
          const item = this.props.repos[repo];
          return <RepoItem key={repo} repo={item}/>
        })}
      </div>)
    }
  }
  render() {
    return (
      <div>
        {this.renderReposList()}
      </div>
    )
  }
}
