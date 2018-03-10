import api from './Api'

export default {
  fetchPosts () {
    return api().get('posts')
  }
}
