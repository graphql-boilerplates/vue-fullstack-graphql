<template>
  <div class="feed">
    <template v-if="loading > 0">
      Loading...
    </template>
    <template v-else>
      <ul>
        <li v-for="post in allPosts" :key="post.id">
          <post :post='post' class="post"/>
        </li>
      </ul>
    </template>
  </div>
</template>

<style>
.post {
  margin-bottom: 20px
}
</style>

<script>
import gql from 'graphql-tag'
import Post from './Post.vue'

// GraphQL query
const FeedQuery = gql`
  query allPosts {
    allPosts(orderBy: createdAt_DESC) {
      id
      imageUrl
      description
    }
  }
`

// Component def
export default {
  // Local state
  data: () => ({
    allPosts: {},
    loading: 0,
  }),
  // Apollo GraphQL
  apollo: {
    allPosts: {
      query: FeedQuery,
      loadingKey: 'loading',
    },
  },
  components: {
    // <my-component> will only be available in parent's template
    'post': Post
  }
}
</script>
