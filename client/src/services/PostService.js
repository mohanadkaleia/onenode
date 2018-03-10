import api from './Api'

export default {
  fetchPosts (callback) {
    return api().get('posts')
    .then(function (response) {
      callback(response, undefined);
    })
    .catch(function (error) {
      callback(undefined, error);
    })

  }
}
