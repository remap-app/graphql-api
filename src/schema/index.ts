import { gql } from 'apollo-server-micro'

export const typeDefs = gql`

type CouponUrl {
  desktop: String
  mobile: String
}

type Restaurant {
  id: String!
  name: String!
  name_kana: String!
  latitude: String!
  longitude: String!
  url: String!
  url_mobile: String
  images: [String]!
  coupon_url: CouponUrl!
  tel: String
  opening_times: String
  catchphrase: String
  description: String
  access: String
  holiday: String
  credit_card: String
  non_smoking: String
  lunch: String
  children: String
}

type Query {
  restaurants: [Restaurant]
}
`

export const resolvers = {
  Query: {
    restaurants: () => [], // tmp
  },
}
