<template>
  <div class="feed">
    <template v-if="allPosts.length === 0">
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
  }`

// Component def
export default {
  // Local state
  data: () => ({
    allPosts: {},
    loading: 0,
  }),
  // Apollo GraphQL
  apollo: {
    allPosts() {
      return {
        query: FeedQuery,
        loadingKey: 'loading',
      }
    },
  },
  mounted() {
    // Query runs to start the subscription
    const subQuery = gql`
      subscription {
        Post(filter: {
          mutation_in: [CREATED]
        }) {
          node {
            id
            imageUrl,
            description
          }
        }
      }`

    this.postSubscription = this.$apollo.queries.allPosts.subscribeToMore({
      document: subQuery,
      // Mutate the previous result
      updateQuery: (previousResult, { subscriptionData }) => {
        return {
          allPosts: [
            ...previousResult.allPosts,
            // Add the new tag
            subscriptionData.data.Post.node,
          ]
        }
      }
    })

    const updateDeleteSubQuery = gql`
      subscription {
        Post(filter: {
          mutation_in: [DELETED, UPDATED]
        }) {
          node {
            id
            imageUrl,
            description
          }
        }
      }`

    this.postSubscription = this.$apollo.queries.allPosts.subscribeToMore({
      document: updateDeleteSubQuery,
      // Mutate the previous result
      updateQuery: (previousResult, { subscriptionData }) => {
        // Refetch the entire list on delete for now
        this.$apollo.queries.allPosts.refetch()
      }
    })
  },
  components: {
    // <my-component> will only be available in parent's template
    'post': Post
  }
}
</script>
