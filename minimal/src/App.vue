<template>
  <div id="app">
    <div class="App-header">
      <img src="./logo.svg" class="App-logo" alt="logo" />
      <h3>Welcome to React + GraphQL + Apollo minimal boilerplate</h3>
      <template v-if="loading > 0">
        <div class="flex w-100 h-100 items-center justify-center pt7">
          <div>Loading...</div>
        </div>
      </template>
      <template v-else>
        <template v-if="error">
          <div class="flex w-100 h-100 items-center justify-center pt7">
            <div>An unexpected error occurred</div>
          </div>
        </template>
        <template v-else>
          <h3>{hello}</h3>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
  import gql from 'graphql-tag'
  const HELLO_QUERY = gql `
    query hello($name: String) {
      hello(name: $name)
    }
  `
  export default {
    name: 'app',

    // data props to component
    data: () => ({
      hello: String,
      loading: 0,
      error: String,
    }),

    // Apollo GraphQL
    apollo: {
      feed: {
        query: HELLO_QUERY,
        loadingKey: 'loading',
        error(error) {
          console.error('We\'ve got an error!', error)
          this.error = error
        }
      },
    }
  }
</script>

<style>

body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}

.App {
  text-align: center;
}

.App-logo {
  animation: App-logo-spin infinite 20s linear;
  height: 80px;
}

.App-header {
  background-color: #222;
  height: 250px;
  padding: 20px;
  color: white;
}

.App-title {
  font-size: 1.5em;
}

.App-intro {
  font-size: large;
  text-align: 'center';
}

h3 {
  text-align: center;
  padding:10px;
}

@keyframes App-logo-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}


</style>
