<template>
  <router-link :to="{ name: 'Detail', params: { id: post.id }}" class="no-underline ma1">
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
    </article>
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
