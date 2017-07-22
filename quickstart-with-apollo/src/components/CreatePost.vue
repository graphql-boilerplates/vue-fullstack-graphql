<template>
  <div class='create'>
    <div class="modal-mask" v-if="showModal" @close="showModal = false">
      <div class="modal-wrapper">
        <div class="modal-container">
  
          <div class="modal-header">
            <slot name="header">
              Add New Photo
            </slot>
          </div>
  
          <div class="modal-body">
            <slot name="body">
              <input v-model="description" placeholder="Description">
              <input v-model="imageUrl" placeholder="Image url">
              <button @click="create">Create Post</button>
            </slot>
          </div>
  
          <div class="modal-footer">
            <slot name="footer">
              
              <button  @click="showModal = false">
                  Close Modal
                </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
    <div class='createPost' @click="showModal = true">
  
      <img src="http://www.startuppassion.eu/wp-content/uploads/2017/03/plus-sign.png" class="plusImage" alt=""><br>
      <button class='newPost' >NEW POST</button>
    </div>
  </div>
</template>

<script>
  import gql from 'graphql-tag'
  const createPost = gql `
    mutation createPost($description: String!, $imageUrl: String!) {
      createPost(description: $description, imageUrl: $imageUrl) {
        id
        imageUrl
        description
      }
    }
  `
  export default {
    data: () => ({
      description: '',
      imageUrl: '',
      showModal: false,
    }),
  
    // Attribute
    methods: {
      create() {
        const description = this.description
        const imageUrl = this.imageUrl
  
        this.description = ''
        this.imageUrl = ''
  
        // Mutation
        this.$apollo.mutate({
          mutation: createPost,
          variables: {
            description,
            imageUrl,
          },
          updateQueries: {
            allPosts: (prev, {
              mutationResult
            }) => {
              return {
                // append at head of list because we sort the posts reverse chronological
                allPosts: [mutationResult.data.createPost, ...prev.allPosts],
              }
            },
          },
        }).then((data) => {
          // Result
          console.log(data);
          this.showModal=false;
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