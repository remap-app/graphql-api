import { client } from '../../services'

const restaurants = async (
  _: any,
  args: { latitude: string, longitude: string, range: number, page: number, perPage: number },
  { accessToken }: { accessToken: string },
) => {
  const restaurnts = await client.getRestaurants({
    latitude: args.latitude,
    longitude: args.longitude,
    range: args.range,
    page: args.page,
    perPage: args.perPage,
  })

  const stocks = await client.getStocks(
    {
      restaurant_ids: restaurnts.map((restaurant: any/* TODO */) => restaurant.id).join(','),
    },
    accessToken
  )

  return restaurnts.map((restaurant: any/* TODO */) => {
    return stocks.find((s: any/* TODO */) => s.restaurant_id === restaurant.id)
      ? { ...restaurant, isStocked: true }
      : restaurant
  })
}

export default restaurants
