import { dispatchAsync } from '../AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import { doSearch, getRepoReadme, getRepo } from '../utils/GithubAPI';


export function requestRepos(repo) {
  dispatchAsync(doSearch(repo), {
    request: ActionTypes.REQUEST_REPOS,
    success: ActionTypes.REQUEST_REPOS_SUCCESS,
    failure: ActionTypes.REQUEST_REPOS_FAILURE
  }, { repo });
}

export function requestRepo(owner, repo) {
  dispatchAsync(getRepo(owner, repo), {
    request: ActionTypes.REQUEST_REPO,
    success: ActionTypes.REQUEST_REPO_SUCCESS,
    failure: ActionTypes.REQUEST_REPO_FAILURE
  }, { owner, repo });
}