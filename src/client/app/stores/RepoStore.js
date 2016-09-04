import {dispatch, register} from '../AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

var _repos = null;
var _repo = null;

const _setRepos = ( repos ) => {
  _repos = Object.assign({}, repos);
  return _repos;
};

const _setRepo = ( repo ) => {
  _repo = Object.assign({}, repo);
  return _repo;
};

const AppStore = Object.assign(EventEmitter.prototype, {
  emitChange() {
    this.emit( CHANGE_EVENT )
  },

  addChangeListener(callback) {
    this.on( CHANGE_EVENT, callback );
  },

  removeChangeListener(callback) {
    this.removeListener( CHANGE_EVENT, callback );
  },

  getRepos() {
    return _repos;
  },

  setRepos(repo) {
    return _setRepos(repo);
  },

  getRepo() {
    return _repo;
  },

  setRepo(repo) {
    return _setRepo(repo);
  },

  dispatcherIndex: register(function(action) {
    switch(action.type) {
      case ActionTypes.REQUEST_REPOS_SUCCESS:
        _setRepos(action.response.items);
        break;
      case ActionTypes.REQUEST_REPO_SUCCESS:
        _setRepo(action.response);
    }

    AppStore.emitChange();
  })
});

export default AppStore;