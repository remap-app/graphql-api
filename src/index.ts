import { ApolloServer } from 'apollo-server-koa'
import * as Koa from 'koa'
import { typeDefs, resolvers } from './schema'

const server = new ApolloServer({ typeDefs, resolvers })
const app = new Koa()
const {
  PORT: port = 4000,
  GRAPHQL_PATH: graphqlPath = '/graphql',
  APP_ORIGIN: origin = 'http://localhost',
} = process.env

server.applyMiddleware({ app, path: graphqlPath })

app.listen({ port }, () => {
  console.log(`🚀 Server ready at ${origin}:${port}${server.graphqlPath}`)
})
