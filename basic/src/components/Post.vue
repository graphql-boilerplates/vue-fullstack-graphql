<template>
  <router-link :to="{ name: 'Detail', params: { id: post.id }}" class="no-underline ma1">
    <div class='container'>
      <h2 className="f3 black-80 fw4 lh-solid">{{ post.title }}</h2>
      <p className="black-80 fw3">{{ post.text }}</p>
    </div>
  </router-link>
</template>

<script>
  export default {
    data: () => ({
      //Todo
    }),
    props: {
      post: {
        type: Object,
        default: function () {
          return { title: '', text: '' }
        }
      },
    }
  }
</script>
<style>
/* Add some padding inside the card container */
.container {
    padding: 2px 16px;
    margin:10px;
}
</style>
