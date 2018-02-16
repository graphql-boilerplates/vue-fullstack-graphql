import Vue from 'vue'
import App from './App.vue'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import VueApollo from 'vue-apollo'

const networkInterface = createNetworkInterface({ uri: 'https://uniserver.now.sh/'})

const apolloClient = new ApolloClient({
  networkInterface,
})

// Vue production tip config
Vue.config.productionTip = false

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
}).$mount('#app')

/*

    "start": "webpack-dev-server --inline --hot --port 3000",
    "build": "cross-env NODE_ENV=production webpack --progress --hide-modules",
*/
