<template>
  <div class="drafts">
    <template v-if="loading > 0">
      <div className="flex w-100 h-100 items-center justify-center pt7">
        <div>Loading...</div>
      </div>
    </template>

    <template v-else>
      <div className="flex justify-between items-center">
        <h1>Drafts</h1>
      </div>
      <ul>
        <li v-for="post in drafts" :key="post.id">
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
  const DRAFTS_QUERY = gql`
    query DraftsQuery {
      drafts {
        id
        text
        title
        isPublished
      }
    }
   `

  // Component def
  export default {
    // Local state
    data: () => ({
      drafts: {},
      loading: 0,
    }),
    // Apollo GraphQL
    apollo: {
      drafts: {
        query: DRAFTS_QUERY,
        loadingKey: 'loading',
      },
    },
    components: {
      // <my-component> will only be available in parent's template
      'post': Post
    }
  }
</script>
