import Vue from 'vue'
import App from './App.vue'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import VueApollo from 'vue-apollo'
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'

// __SUBSCRIPTIONS_API_ENDPOINT_ looks similar to: `wss://subscriptions.graph.cool/v1/<PROJECT_ID>`
const wsClient = new SubscriptionClient('__SUBSCRIPTIONS_API_ENDPOINT__', {
  reconnect: true,
})

// __SIMPLE_API_ENDPOINT_ looks similar to: `https://api.graph.cool/simple/v1/<PROJECT_ID>`
const networkInterface = createNetworkInterface({ uri: '__SIMPLE_API_ENDPOINT__' })

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
)

const apolloClient = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  dataIdFromObject: o => o.id
})

// Install the vue plugin
Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  clients: {
    a: apolloClient,
  },
  defaultClient: apolloClient,
})

// Start the app
new Vue({
  el: '#app',
  apolloProvider,
  render: h => h(App)
})
