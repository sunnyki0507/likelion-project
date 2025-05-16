import { Elysia } from 'elysia'
import axios from 'axios'
import { config } from 'dotenv'
import cors from '@elysiajs/cors'
config()
const YELP_API_KEY = process.env.YELP_API_KEY

function mapSortKey(key: string): string {
  switch (key) {
    case 'Ratings':
      return 'rating'
    case 'Number of Reviews':
      return 'review_count'
    case 'Distance':
      return 'distance'
    case 'Best':
    default:
      return 'best_match' // default
  }
}
export const searchPlugin = new Elysia()
.use(cors({
    origin: 'http://localhost:3001'
  }))
.get('/search', async ({ query, set }) => {
  const {
    location = "92612",
    categories,
    distance,
    price,
    sortBy = 'best_match',
    //ratings,
    //delivery,
    attributes
  } = query

  if (!location) {
    set.status = 400
    return { error: 'location required' }
  }

  try {
    const response = await axios.get('https://api.yelp.com/v3/businesses/search', {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`
      },
      params: {
        location,
        term: 'restaurants',
        //categories,
        //radius: distance ? Math.floor(parseFloat(distance) * 1000) : undefined,
        //price,
        limit: 15,
        open_now: true,
        sort_by: mapSortKey(sortBy || 'best_match'),
        //attributes: Array.isArray(attributes) ? attributes.join(',') : attributes
      }
    })

    let businesses = response.data.businesses.map((biz: any) => ({
      id: biz.id,
      name: biz.name,
      rating: biz.rating,
      reviews: biz.review_count,
      distance: (biz.distance / 1000).toFixed(1) + 'km',
      category: biz.categories?.[0]?.title ?? '',
      isOpen: !biz.is_closed,
      hasOnlineOrder: biz.transactions.includes('pickup'),
      hasDelivery: biz.transactions.includes('delivery'),
      takesReservations: false,
      image: biz.image_url,
      likes: 500,
      //description: 'Description about the restaurant',
      attributes: ['hot_and_new', 'reservation'], // 샘플 값
    }))

    // if (ratings) {
    //   businesses = businesses.filter(r => r.rating >= Number(ratings))
    // }

    // if (delivery === 'true') {
    //   businesses = businesses.filter(r => r.hasDelivery)
    // }

    return businesses
  } catch (error: any) {
    console.error('Yelp API error:', error.response?.data || error.message)
    set.status = 500
    return { error: 'Failed to fetch from Yelp' }
  }
})
