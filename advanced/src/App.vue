<template>
  <div id="app">
    <nav class="pa3 pa4-ns">
      <router-link v-bind:to="'/'" exact class="link dim b f6 f5-ns dib mr3" title="Feed">Blog</router-link>
      <router-link v-bind:to="'/'" exact class="link dim f6 f5-ns dib mr3 black" title="Feed">Feed</router-link>
      <router-link v-bind:to="'/drafts'" exact class="link dim f6 f5-ns dib mr3 black" title="Drafts">Drafts</router-link>
      
      <template v-if="isLoggedin">
        <a @click="logout" exact class="f6 link dim br1 ba ph3 pv2 fr mb2 dib black" title="Drafts">Logout</a>
        <router-link v-bind:to="'/create'" exact class="f6 link dim br1 ba ph3 pv2 fr mr2 mb2 dib black" title="Drafts">+ Create Draft</router-link>
      </template>

      <template v-else>
        <router-link v-bind:to="'/signup'" exact class="f6 link dim br1 ba ph3 pv2 fr mb2 dib black" title="Drafts">Sign Up</router-link>
        <router-link v-bind:to="'/login'" exact class="f6 link dim br1 ba ph3 pv2 fr mr2 mb2 dib black" title="Drafts">Sign In</router-link>
      </template>
      
    </nav>

    <div class="fl w-100 pl4 pr4">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import { USER_ID, AUTH_TOKEN  } from './constants'

  export default {
    name: 'app',
    data: () => ({
      isLoggedin: localStorage.getItem(AUTH_TOKEN) ? true : false,
    }),

    computed: {
      userId () {
        return this.$root.$data.userId
      },
      token () {
        return this.$root.$data.token
      }
    },
    methods: {
      logout () {
        localStorage.removeItem(USER_ID)
        localStorage.removeItem(AUTH_TOKEN)
        this.$root.$data.userId = localStorage.getItem(USER_ID)
        this.$root.$data.token = localStorage.getItem(AUTH_TOKEN)
          this.$router.push({ path: '/' })
      }
    }
  }
</script>

<style>

body, input, button {
  font-family: Helvetica, sans-serif;
  font-size: 16pt;
}

ul li {
  list-style: none;
}

.app {
  text-align: center;
  display: flex;
  justify-content: center;

  padding: 12px;
  margin: auto;
}

input:focus {
  box-shadow: none;
  outline: none;
  border-color: #40b883;
}

input {
  padding: 8px;
  border: solid 1px #bbb;
  border-radius: 2px;
}
@import 'https://fonts.googleapis.com/css?family=Open+Sans:300, 400';

body {
  margin: 0;
  padding: 0;
  font-family: 'Open Sans', sans-serif;
  background: rgba(0, 0, 0, 0.05);
}

html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

.post {
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.15);
  width: 350px;
  height: 350px;
  flex: 0 0 350px;
}

.post .description {
  flex: 1;
  padding-left: 25px;
  font-size: 25px;
}

.detail {
  width: 600px;
  height: 600px;
  flex: 0 0 600px;
}

.detail .description {
  flex: 1;
  padding-left: 40px;
  font-size: 38px;
}

.title {
  font-size: 42px;
}

.content {
  font-size: 18px;
}

.new-post {
  background-color: rgba(0, 0, 0, 0.04);
}

.close {
  opacity: 0.5;
  margin-top: 60px;
  margin-right: 60px;
}

.close img {
  width: 20px;
  height: 20px;
}


</style>
