import request from 'superagent';

const api = 'https://api.github.com';
const apiSearch = `${api}/search/repositories?q=`;
const apiRepo = `${api}/repos`;

export function doSearch(repository) {
  return new Promise(
    function (resolve, reject) {
      request.get(`${apiSearch}${repository}`)
        .set('Accept', 'application/json')
        .end((err, response) => {
          if (err) {
            console.log(err);
            reject(err);
          }

          console.log('response', response);
          resolve(response.body);
        })
    })
}

export function getRepo(owner, repo) {
  return new Promise(
    function (resolve, reject) {
      getRepoReadme(owner, repo)
        .then(getRepoReadmeContents)
        .then((readme) => {
          request.get(`${apiRepo}/${owner}/${repo}`)
            .end((err, response) => {
              if (err) {
                reject(err);
              }

              response.body.readme_content = readme;
              return resolve(response.body);
            })
        })
    }
  )
}

function getRepoReadmeContents(response) {
  return new Promise(
    function (resolve, reject) {
      request.get(response.download_url)
        .end((err, response) => {
        if (err) {
          reject(err);
        }

        resolve(response.text);
      })
    }
  )
}

export function getRepoReadme(owner, repo) {
  return new Promise(
    function (resolve, reject) {
      request.get(`${apiRepo}/${owner}/${repo}/readme`)
        .set('Accept', 'application/json')
        .end((err, response) => {
          if (err) {
            reject(err);
          }

          resolve(response.body);
        })
    }
  )
}