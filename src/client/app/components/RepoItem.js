import React, { Component } from 'react';
import { Link } from 'react-router';

export default class RepoItem extends Component {
  render() {
    const { repo } = this.props;
    return (
      <div><Link to={`/repo/${repo.owner.login}/${repo.name}`}>{repo.name}</Link></div>
    )
  }
}