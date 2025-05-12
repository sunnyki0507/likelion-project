import { Elysia } from 'elysia'
import axios from 'axios'
import { config } from 'dotenv'
import cors from '@elysiajs/cors'

config()
const YELP_API_KEY = process.env.YELP_API_KEY

export const searchPlugin = new Elysia()
.use(cors({
    origin: 'http://localhost:3001'
  }))
.get('/search', async ({ query, set }) => {
  const { location, categories, pricing } = query

  if (!location || !categories || !pricing) {
    set.status = 400
    return { error: 'location, categories, and pricing are required' }
  }

  try {
    const response = await axios.get('https://api.yelp.com/v3/businesses/search', {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`
      },
      params: {
        location,
        term: 'restaurants',
        categories,
        price: pricing,
        limit: 15,
        open_now: true,
        sort_by: 'review_count'
      }
    })

    return response.data.businesses.map((biz: any) => ({
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
      description: 'Description about the restaurant',
    }))
  } catch (error: any) {
    console.error('Yelp API error:', error.response?.data || error.message)
    set.status = 500
    return { error: 'Failed to fetch from Yelp' }
  }
})
