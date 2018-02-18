<template>
  <div class="feed">

    <template v-if="loading > 0">
      <div className="flex w-100 h-100 items-center justify-center pt7">
        <div>Loading...</div>
      </div>
    </template>

    <template v-else>
      <h1>Feed</h1>
      <ul>
        <li v-for="post in feed" :key="post.id">
          <post :post='post' class="post" />
        </li>
      </ul>
    </template>

  </div>
</template>

<style>

</style>

<script>
  import gql from 'graphql-tag'
  import Post from './Post.vue'
  
  // GraphQL query
  const FEED_QUERY = gql `
    query feed {
      feed {
        id
        text
        title
        isPublished
        author{
          name
        }
      }
    }
  `
  
  // Component def
  export default {
    // Local state
    data: () => ({
      feed: {},
      loading: 0,
    }),
    // Apollo GraphQL
    apollo: {
      feed: {
        query: FEED_QUERY,
        loadingKey: 'loading',
      },
    },
    components: {
      // <my-component> will only be available in parent's template
      'post': Post
    }
  }
</script>
