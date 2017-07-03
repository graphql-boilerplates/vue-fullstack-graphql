<template>
  <div class="feed">
    <template v-if="loading > 0">
        Loading...
</template>

<template v-else>
  <ul>
    <li v-for="post in allPosts" :key="post.id">
      <post :post='post' class="post" />
    </li>
  </ul>
</template>
  </div>
</template>

<style>
  /*.post {
    margin-bottom: 20px;
    background-color:gray;
    border-radius:20px;
    border-shadow
  }*/
  
  .post {
    /* Add shadows to create the "card" effect */
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    width: 300px;
    height: 300px;
    float: left;
  }
  
  ul {
    list-style: none outside none;
  }
  
  li {
    position: relative;
    display: inline;
  }
  
  
  /* On mouse-over, add a deeper shadow */
  
  .post:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
</style>

<script>
  import gql from 'graphql-tag'
  import Post from './Post.vue'
  
  // GraphQL query
  const FeedQuery = gql `
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
