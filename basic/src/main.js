import Vue from 'vue'
import App from './App.vue'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import VueApollo from 'vue-apollo'

const networkInterface = createNetworkInterface({ uri: 'http://localhost:4000'});

const apolloClient = new ApolloClient({
  networkInterface,
})

// Install the vue plugin
Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

// Start the app
new Vue({
  el: '#app',
  apolloProvider,
  render: h => h(App)
})
