import React, { Component } from 'react';
import { markdown } from 'markdown';
import RepoStore from '../../stores/RepoStore';
import RepoActions, { requestRepoReadme, requestRepo } from '../../actions/RepoActions';

export default class Repo extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  loadRepo(owner, repo) {
    requestRepo(owner, repo)
  }

  handleChange() {
    this.setState({repo: RepoStore.getRepo()})
  }

  componentWillMount() {
    const { owner, repo } = this.props.params;
    this.loadRepo(owner, repo);
    this.setState({repo: RepoStore.setRepo(owner, repo)});
    RepoStore.addChangeListener( this.handleChange )
  }

  componentWillUnmount() {
    RepoStore.removeChangeListener( this.handleChange )
  }

  renderRepo() {
    if (this.state.repo) {
      const { name, readme_content, forks, open_issues } = this.state.repo;

      let readme = '';
      if (readme_content) {
        readme = markdown.toHTML(readme_content);
      }

      return (<div>
          <h1>{name}</h1>
          <p>Forks: {forks}</p>
          <p>Issues: {open_issues}</p>
          <p dangerouslySetInnerHTML={{__html: readme}}></p>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderRepo()}
      </div>
    )
  }
}