<template>
  <div class="detail" >
    <template v-if="loading > 0">
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <div>Loading...</div>
        </div>
    </template>

    <template v-else>
        <article class="bb b--black-10">
          <a class="db pv4 ph3 ph0-l no-underline black dim" href="#0">
            <div class="flex flex-column flex-row-ns">
              <div class="w-100 w-60-ns pl3-ns">
                <h1 class="f3 fw1 baskerville mt0 lh-title">{{ post.title }}</h1>
                <p class="f6 f5-l lh-copy">
                  {{ post.text }}
                </p>
                <p class="f6 lh-copy mv0">By {{ post.author.name }}</p>
              </div>
            </div>
          </a>
        <template v-if="post.isPublished">
            <div>
                <a class="f6 dim br1 ba ph3 pv2 mb2 dib black pointer" @click="deletePost" >
                    Delete
                </a>
            </div>
        </template>
        <template v-else>
            <div>
                <a class="f6 dim br1 ba ph3 pv2 mb2 dib black pointer" @click="publishDraft" >
                    Publish
                </a>
            </div>
        </template>
        </article>
    </template>
  </div>
</template>
<script>
  import gql from 'graphql-tag'
  const POST_QUERY = gql`
    query PostQuery($id: ID!) {
      post(id: $id) {
        id
        title
        text
        isPublished
        author{
          name
        }
      }
    }
  `
  const PUBLISH_MUTATION = gql`
    mutation publish($id: ID!) {
      publish(id: $id) {
        id
        isPublished
      }
    }
  `
  const DELETE_MUTATION = gql`
      mutation deletePost($id: ID!) {
          deletePost(id: $id) {
          id
          }
      }
  `
  export default {
    data: () => ({
      post: {},
      loading: 0,
    }),

    // Apollo GraphQL
    apollo: {
      post: {
        query: POST_QUERY,
        loadingKey: 'loading',
        variables() {
            return {
                id: this.$route.params.id,
            }
        }
      },
    },

    // Attribute
    methods: {
      deletePost() {
        // Mutation
        this.$apollo.mutate({
          mutation: DELETE_MUTATION,
          variables: {
            id: this.$route.params.id,
          },
        }).then((data) => {
          // Result
          console.log(data);
          this.$router.push({ path: 'Feed' })
        }).catch((error) => {
          // Error
          console.error(error)
        })
      },
      publishDraft() {
        const postId = this.$route.params.id
        // Mutation
        this.$apollo.mutate({
          mutation: PUBLISH_MUTATION,
          variables: {
            id: this.$route.params.id,
          },
        }).then((data) => {
          // Result
          console.log(data);
          this.$router.push({ path: 'Drafts' })
        }).catch((error) => {
          // Error
          console.error(error)
        })
      },
    },
  }
</script>

<style>
  .createPost {
    /* Add shadows to create the "card" effect */
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    width: 300px;
    height: 300px;
    margin-top: 35px;
    float: left;
  }

  .createPost:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }

  .newPost {
    border: none;
    color: gray;
    background-color: white;
  }

  .plusImage {
    opacity: 0.4;
    margin-top: 25%;
    width: 25%;
    height: 25%;
  }

  .modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 400px;
  height: 200px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 15%;
}
.modal-enter {
  opacity: 0;
}
.modal-footer{
  float:right;
}
.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
  /*
  .create {
    text-align: center;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
  }*/
</style>


