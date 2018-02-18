<template>
  <div class='create'>
      <div className="pa4 flex justify-center bg-white">
        <form v-on:submit.prevent="create">
          <h1>Create Draft</h1>
          <input
            auto-focus
            class="w-100 pa2 mv2 br2 b--black-20 bw1"
            v-model="title"
            placeholder="Title"
            type="text"
            value={title}
          />
          <textarea
            class="db w-100 ba bw1 b--black-20 pa2 br2 mb2"
            cols="50"
            v-model="text"
            placeholder="Content"
            rows="8"
          />

          <input class="f6 br1 ba ph3 pv2 mb2 dib black pointer disabled"
            v-bind:class="classObject"
            type="submit"
            value="Create"
          />{{' '}}
          <a class="f6 pointer">
            or cancel
          </a>
        </form>
      </div>
  </div>
</template>

<script>
  import gql from 'graphql-tag'
  const CREATE_POST = gql `
    mutation CreateDraftMutation($title: String!, $text: String!) {
      createDraft(title: $title, text: $text) {
        id
        title
        text
      }
    }
  `
  const FEED_QUERY = gql `
    query feed {
      feed {
        id
        text
        title
        isPublished
      }
    }
  `

  export default {
    data: () => ({
      title: '',
      text: ''
    }),

    // Attribute
    methods: {
      create() {
        const title = this.title
        const text = this.text

        this.title = ''
        this.text = ''

        // Mutation
        this.$apollo.mutate({
          mutation: CREATE_POST,
          variables: {
            title,
            text,
          },
          // Update the cache with the result
          // and then with the real result of the mutation
          update: (store, { data: { createDraft } }) => {
            // Read the data from our cache for this query.
            const data = store.readQuery({ query: FEED_QUERY })
            // Add our post from the mutation to the end
            data.feed.push(createDraft)
            // Write our data back to the cache.
            store.writeQuery({ query: FEED_QUERY, data })
          }
        }).then((data) => {
          // Result
          console.log(data);
          this.$router.push({ path: 'Drafts' })
        }).catch((error) => {
          // Error
          alert(`Error from ${error}`)
          console.error(error)
        })
      },
    },

    computed: {
      canPost: function () {
        return {
          disabled: !this.text && !this.title
        }
      },
      classObject: function(){
        return {
          dim: this.text && this.title
        }
      }
    }
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
