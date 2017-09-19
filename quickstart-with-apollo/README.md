# Vue & Apollo Quickstart

* [Vue](https://vuejs.org/): Progressive Javascript framework for building user interfaces 
* [Apollo Client](https://github.com/apollographql/apollo-client): Fully-featured, production ready caching GraphQL client
* [Graphcool](https://www.graph.cool): Flexible backend platform combining GraphQL + AWS Lambda

## Example ([GraphQL Playground](https://api.graph.cool/simple/v1/cj1erhgba0uxi0109k14mdght))


![](http://imgur.com/3S6fUeI.gif)

## Quickstart

For more information on how to get started [refer to the full vue-apollo-instagram tutorial](https://www.graph.cool/docs/quickstart/).

### 1. Clone example repository

```sh
git clone https://github.com/graphcool-examples/vue-graphql.git
cd vue-graphql/quickstart-with-apollo
```

### 2. Create GraphQL API with [`graphcool`](https://www.npmjs.com/package/graphcool)

#### 2.1. Create Graphcool project

```sh
# Install Graphcool CLI
npm install -g graphcool

# Create a new "blank" project inside a directory called "graphcool"
graphcool init graphcool --template blank
```

This creates a new project inside your Graphcool account as well as the local project structure inside the `graphcool` directory:

```
.
└── graphcool
    ├── code
    │   ├── hello.graphql
    │   └── hello.js
    ├── graphcool.yml
    └── types.graphql
```

Read the documentation to learn more about the file structure and [project configuration](https://www.graph.cool/docs/reference/basics/project-configuration-t%28yaml%29-opheidaix3).

#### 2.2. Configure data model

Open `./graphcool/types.graphql` and add the following type definition to it:

```graphql
type Post {
  id: ID! @isUnique
  createdAt: DateTime!
  updatedAt: DateTime!
  description: String!
  imageUrl: String!
}
```

Now apply the changes you just made locally to the remote project in your Graphcool account:

```sh
cd graphcool
graphcool deploy
```

The `Post` type is now added to your data model and the corresponding CRUD operations are generated.


### 3. Connect the app with your GraphQL API

Copy the `Simple API` endpoint to `./src/main.js` as the `uri` argument in the `createNetworkInterface` call:

```js
// replace `__SIMPLE_API_ENDPOINT__` with the endpoint from the previous step
const networkInterface = createNetworkInterface({ uri: '__SIMPLE_API_ENDPOINT__' })
```

### 4. Install dependencies & run locally

```sh
yarn install
yarn start # open http://localhost:3000 in your browser
```

## Next steps

* [Advanced GraphQL features](https://www.graph.cool/docs/tutorials/advanced-features-eath7duf7d/)
* [Authentication & Permissions](https://www.graph.cool/docs/reference/authorization/overview-iegoo0heez/)
* [Implementing business logic with serverless functions](https://www.graph.cool/docs/reference/functions/overview-boo6uteemo/)
* [Dive deeper into GraphQL on How to GraphQL](https://www.howtographql.com)

## Help & Community [![Slack Status](https://slack.graph.cool/badge.svg)](https://slack.graph.cool)

Say hello in our [Slack](http://slack.graph.cool/) or visit the [Graphcool Forum](https://www.graph.cool/forum) if you run into issues or have questions. We love talking to you!

![](http://i.imgur.com/5RHR6Ku.png)
