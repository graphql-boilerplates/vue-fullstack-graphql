import Vue from 'vue'
import App from './App.vue'
import { ApolloClient, createBatchingNetworkInterface } from 'apollo-client'
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'
import VueApollo from 'vue-apollo'
import router from './router'
import { USER_ID, AUTH_TOKEN } from './constants'

// Vue production tip config
Vue.config.productionTip = false


const networkInterface = createBatchingNetworkInterface({
  uri: 'https://uniserver.now.sh/'
})

const wsClient = new SubscriptionClient('__SUBSCRIPTION_API_ENDPOINT__', {
  reconnect: true,
  connectionParams: {
    Authorisation: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`
  }
})

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
)

networkInterface.use([{
  applyBatchMiddleware (req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }
    const token = localStorage.getItem(AUTH_TOKEN)
    req.options.headers.authorization = token ? `Bearer ${token}` : null
    next()
  }
}])

const apolloClient = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  connectToDevTools: true
})

// Install the vue plugin
Vue.use(VueApollo)

// Apollo provider init
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $loadingKey: 'loading'
  }
})

// get user authentication token saved after login
let token = localStorage.getItem(AUTH_TOKEN)

// Start the app
new Vue({
  el: '#app',
  apolloProvider,
  router,
  data: {
    token
  },
  render: h => h(App)
}).$mount('#app')

/*

    "start": "webpack-dev-server --inline --hot --port 3000",
    "build": "cross-env NODE_ENV=production webpack --progress --hide-modules",
*/