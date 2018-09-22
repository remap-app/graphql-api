import { ApolloServer } from 'apollo-server-micro'
import * as compose from 'micro-compose'
import { handleErrors } from 'micro-errors'
import * as cors from 'micro-cors-multiple-allow-origin'
import { typeDefs, resolvers } from './schema'

const { CORS_ALLOWED_ORIGINS = '', NODE_ENV = 'development' } = process.env

const apolloServer = new ApolloServer({ typeDefs, resolvers })

module.exports = compose(
  handleErrors({ debug: NODE_ENV !== 'production' }),
  cors({
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    origin: CORS_ALLOWED_ORIGINS.split(','),
  }),
)(apolloServer.createHandler())
