import { Elysia } from 'elysia'
import axios from 'axios'
import { config } from 'dotenv'
import cors from '@elysiajs/cors'
import qs from 'qs'

config()
const YELP_API_KEY = process.env.YELP_API_KEY

function mapSortKey(key: string): string {
  switch (key?.toLowerCase()) {
    case 'ratings':
      return 'rating'
    case 'number of reviews':
      return 'review_count'
    case 'distance':
      return 'distance'
    case 'best':
    default:
      return 'best_match'
  }
}

export const searchPlugin = new Elysia()
  .use(cors({
       origin: 'http://localhost:3001'
      }))

  .get('/search', async ({ query, set }) => {
    const {
      location,
      categories,
      distance,
      price,
      sort_by,
      attributes
    } = query

    if (!location) {
      set.status = 400
      return { error: 'location required' }
    }

    const parsedCategories = Array.isArray(categories)
      ? categories
      : typeof categories === 'string'
        ? categories.split(',').map(c => c.trim())
        : undefined

    const parsedAttributes = Array.isArray(attributes)
    ? attributes
    : typeof attributes === 'string'
      ? attributes.split(',').map(a => a.trim())
      : undefined

    const params: Record<string, any> = {
      location,
      term: 'restaurants',
      categories: parsedCategories,
      attributes: parsedAttributes,
      price: price ? String(price) : undefined,
      limit: 50,
      sort_by: mapSortKey(sort_by as string),
    }

    //distance 처리
    if (distance) {
      const radiusInMeters = Math.floor(parseFloat(distance) * 1000)
      if (!isNaN(radiusInMeters) && radiusInMeters <= 40000) {
        params.radius = radiusInMeters
      }
    }

    const baseUrl = 'https://api.yelp.com/v3/businesses/search'
    const queryString = qs.stringify(params, { arrayFormat: 'repeat' })
    console.clear()
    console.log("🔎 Yelp 요청 URL:\n" + `${baseUrl}?${queryString}\n`)

    try {
      const response = await axios.get(baseUrl, {
        headers: {
          Authorization: `Bearer ${YELP_API_KEY}`
        },
        params,
        paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' })
      })

      const businesses = response.data.businesses.map((biz: any, index: number) => ({
        id: `yelp_${biz.id}_${Date.now()}_${index}`,
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
        attributes: ['hot_and_new', 'reservation'],
      }))

      // Filter out any duplicate businesses by ID
      const uniqueBusinesses = businesses.filter((business: any, index: number, self: any[]) =>
        index === self.findIndex((b: any) => b.id === business.id)
      )

      return uniqueBusinesses
    } catch (error: any) {
      console.error('Yelp API error:', error.response?.data || error.message)
      set.status = 500
      return { error: 'Failed to fetch from Yelp' }
    }
  })



