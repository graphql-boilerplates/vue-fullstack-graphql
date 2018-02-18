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
