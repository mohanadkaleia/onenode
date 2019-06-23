import api from './Api'

export default {
  listFiles (callback) {
    return api().get('file/list')
    .then(function (response) {
      callback(response, undefined);
    })
    .catch(function (error) {
      callback(undefined, error);
    })

  }
}
