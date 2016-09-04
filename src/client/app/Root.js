import React, { PropTypes, Component } from 'react';
import { hashHistory } from 'react-router';
import { Router, Route } from 'react-router';

import App from './App';
import Repo from './components/repo/Index';

export default class Root extends Component {

    render() {
        const { history } = this.props;
        return (
            <Router history={hashHistory}>
              <Route name='home' path='/' component={App}/>
              <Route name='repo' path='/repo/:owner/:repo' component={Repo}/>
            </Router>
        );
    }
}