require('dotenv').config()

import { IncomingMessage } from 'http'
import { ApolloServer } from 'apollo-server-micro'
import * as compose from 'micro-compose'
import { handleErrors } from 'micro-errors'
import * as cors from 'micro-cors-multiple-allow-origin'
import { typeDefs } from './schema'
import resolvers from './resolvers'

interface IReq extends IncomingMessage {
  auth?: IAuthentication;
}

const { CORS_ALLOWED_ORIGINS = '', NODE_ENV = 'development' } = process.env

const dev: boolean = NODE_ENV !== 'production'

const parseAuthToken = (auth: string): string => auth.trim().split('Bearer ')[1]

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }: { req: IReq }) => ({ accessToken: parseAuthToken(req.headers.authorization || '') }),
})

const allowMethods = ['POST', 'OPTIONS']

if (dev) {
  allowMethods.push('GET')
}

module.exports = compose(
  handleErrors({ debug: dev }),
  cors({
    allowMethods,
    origin: CORS_ALLOWED_ORIGINS.split(','),
  }),
)(apolloServer.createHandler())
