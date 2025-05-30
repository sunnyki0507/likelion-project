// import { Elysia } from 'elysia'
// import axios from 'axios'
// import { config } from 'dotenv'
// import cors from '@elysiajs/cors'
// import qs from 'qs'

// config()
// const YELP_API_KEY = process.env.YELP_API_KEY

// function mapSortKey(key: string): string {
//   switch (key) {
//     case 'Ratings':
//       return 'rating'
//     case 'Number of Reviews':
//       return 'review_count'
//     case 'Distance':
//       return 'distance'
//     case 'Best':
//     default:
//       return 'best_match'
//   }
// }

// export const searchPlugin = new Elysia()
//   .use(cors({
//        origin: 'http://localhost:3001'
//       }))

//   .get('/search', async ({ query, set }) => {
//     const {
//       location,
//       categories,
//       distance,
//       price,
//       sortBy,
//       attributes
//     } = query

//     if (!location) {
//       set.status = 400
//       return { error: 'location required' }
//     }

//     const parsedCategories = Array.isArray(categories)
//       ? categories
//       : typeof categories === 'string'
//         ? categories.split(',').map(c => c.trim())
//         : undefined

//     const params: Record<string, any> = {
//       location,
//       term: 'restaurants',
//       categories: parsedCategories,
//       price: price ? String(price) : undefined,
//       limit: 15,
//       //open_now: true,
//       sort_by: mapSortKey(sortBy),
//     }

//     // ✅ distance 처리 (선택 사항, 최대 40000m)
//     if (distance) {
//       const radiusInMeters = Math.floor(parseFloat(distance) * 1000)
//       if (!isNaN(radiusInMeters) && radiusInMeters <= 40000) {
//         params.radius = radiusInMeters
//       }
//     }

//     // ✅ 전체 요청 URL 콘솔 출력
//     const baseUrl = 'https://api.yelp.com/v3/businesses/search'
//     const queryString = qs.stringify(params, { arrayFormat: 'repeat' })
//     console.clear()
//     console.log("🔎 Yelp 요청 URL:\n" + `${baseUrl}?${queryString}\n`)

//     try {
//       const response = await axios.get(baseUrl, {
//         headers: {
//           Authorization: `Bearer ${YELP_API_KEY}`
//         },
//         params,
//         paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' })
//       })

//       const businesses = response.data.businesses.map((biz: any) => ({
//         id: biz.id,
//         name: biz.name,
//         rating: biz.rating,
//         reviews: biz.review_count,
//         distance: (biz.distance / 1000).toFixed(1) + 'km',
//         category: biz.categories?.[0]?.title ?? '',
//         isOpen: !biz.is_closed,
//         hasOnlineOrder: biz.transactions.includes('pickup'),
//         hasDelivery: biz.transactions.includes('delivery'),
//         takesReservations: false,
//         image: biz.image_url,
//         likes: 500,
//         attributes: ['hot_and_new', 'reservation'],
//       }))

//       return businesses
//     } catch (error: any) {
//       console.error('Yelp API error:', error.response?.data || error.message)
//       set.status = 500
//       return { error: 'Failed to fetch from Yelp' }
//     }
//   })

import { Elysia } from 'elysia'
import axios from 'axios'
import { config } from 'dotenv'
import cors from '@elysiajs/cors'
import qs from 'qs'

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
      sortBy,
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
      limit: 15,
      //open_now: true,
      sort_by: mapSortKey(sortBy),
    }

    // ✅ distance 처리 (선택 사항, 최대 40000m)
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

      const businesses = response.data.businesses.map((biz: any) => ({
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
        attributes: ['hot_and_new', 'reservation'],
      }))

      return businesses
    } catch (error: any) {
      console.error('Yelp API error:', error.response?.data || error.message)
      set.status = 500
      return { error: 'Failed to fetch from Yelp' }
    }
  })




