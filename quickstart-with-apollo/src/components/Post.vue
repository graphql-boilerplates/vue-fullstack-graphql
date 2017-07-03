<template>
  <div class='container'>
    <img :src='post.imageUrl' v-bind:style='image'>
    <div>{{ post.description }}</div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      image: {
        'min-width': '60%',
        'max-width': '60%'
      }
    }),
    props: {
      post: {
        type: Object,
        default: function () {
          return { description: '', imageUrl: '' }
        }
      },
    },
  }
</script>
<style>
/* Add some padding inside the card container */
.container {
    padding: 2px 16px;
    margin:10px;
}
</style>
