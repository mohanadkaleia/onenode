<template>
  <div class="posts">
    This file will list all the posts.

    <div v-for="post in posts">
      <p>
        <span><b>{{post.title}}</b></span></br/>
        <span>{{post.description}}</span>
      </p>
    </div>
  </div>
</template>

<script>
import PostService from '@/services/PostsService'
export default {
  name: 'posts',
  data () {
    return {
      posts: []
    }
  },
  mounted () {
    this.getPosts()
  },
  methods: {
    async getPosts () {
      const response = await PostService.fetchPosts()
      this.posts = response.data
    }
  }
}
</script>
