import React from 'react'
import ReactDOM from 'react-dom'
import ListPage from './components/ListPage'
import CreatePage from './components/CreatePage'
import DetailPage from './components/DetailPage'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import ApolloClient, {createNetworkInterface} from 'apollo-client'
import {ApolloProvider} from 'react-apollo'
import 'tachyons'
import './index.css'

// Paste your endpoint for the Simple API here.
// Info: https://github.com/graphcool-examples/react-apollo-instagram-example#2-create-graphql-api-with-graphcool
const networkInterface = createNetworkInterface({ uri: '__SIMPLE_API_ENDPOINT__' });

const client = new ApolloClient({networkInterface})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <div>

        <Route exact path='/' component={ListPage} />
        <Route path='/create' component={CreatePage} />
        <Route path='/post/:id' component={DetailPage} />

      </div>
    </Router>
  </ApolloProvider>,
  document.getElementById('root'),
)
