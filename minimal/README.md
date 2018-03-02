<h1 align="center"><strong>Boilerplate for a Minimal Fullstack GraphQL App with Vue</strong></h1>

<br />

![](https://camo.githubusercontent.com/e78e52aa36ff76ef5e142bfeced3b5f657b3fc26/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f3830302f312a483941414e6f6f664c716a53313058643554775259772e706e67)

<div align="center"><strong>🚀 Bootstrap your fullstack GraphQL app within seconds</strong></div>
<div align="center">Basic starter kit for a fullstack GraphQL app with Vue and Node.js - based on best practices from the GraphQL community.</div>

## Features

- **Scalable GraphQL server:** The server uses [`graphql-yoga`](https://github.com/prisma/graphql-yoga) which is based on Apollo Server & Express
- **Pre-configured Apollo Client:** The project comes with a preconfigured setup for Apollo Client
- **Tooling**: Out-of-the-box support for [GraphQL Playground](https://github.com/prisma/graphql-playground) & [query performance tracing](https://github.com/apollographql/apollo-tracing)
- **Extensible**: Minimal [GraphQL schema](https://blog.graph.cool/graphql-server-basics-the-schema-ac5e2950214e) – easy to extend
- **No configuration overhead**: Preconfigured [`graphql-config`](https://github.com/prisma/graphql-config) setup


## Requirements

You need to have the [GraphQL CLI](https://github.com/graphql-cli/graphql-cli) installed to bootstrap your GraphQL server using `graphql create`:

```sh
npm install -g graphql-cli
```

## Getting started

```sh
# 1. Bootstrap GraphQL server in directory `my-app`, based on `vue-fullstack-minimal` boilerplate
graphql create my-app --boilerplate vue-fullstack-minimal

# 2. When prompted, deploy the Prisma service to a _public cluster_

# 3. Navigate into the `server` directory of the new project
cd my-app/server

# 4. Start the server
yarn start # runs server on http://localhost:4000

# 5. Open a new tab in the terminal and navigate back into my-app;
# then run the app
cd ..
yarn start
```

## Contributing

The GraphQL boilerplates are maintained by the GraphQL community, with official support from the [Apollo](https://dev-blog.apollodata.com) & [Graphcool](https://blog.graph.cool/) teams.

Your feedback is **very helpful**, please share your opinion and thoughts! If you have any questions or want to contribute yourself, join the [`#graphql-boilerplate`](https://graphcool.slack.com/messages/graphql-boilerplate) channel on our [Slack](https://graphcool.slack.com/).
