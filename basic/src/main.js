import Vue from 'vue'
import App from './App.vue'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { WebSocketLink } from 'apollo-link-ws'
import { ApolloLink, split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
import VueApollo from 'vue-apollo'
import router from './router'

// Vue production tip config
Vue.config.productionTip = false

const httpLink = new HttpLink({ uri: 'http://localhost:4000/' })

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/`,
  options: {
    reconnect: true,
  }
})

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink,
)

// apollo client setup
const client = new ApolloClient({
  link: ApolloLink.from([link]),
  cache: new InMemoryCache(),
  connectToDevTools: true
})

// Install the vue plugin
Vue.use(VueApollo)

// Apollo provider init
const apolloProvider = new VueApollo({
  defaultClient: client
})

// Start the app
new Vue({
  el: '#app',
  provide: apolloProvider.provide(),
  router,
  render: h => h(App)
}).$mount('#app')