import { Elysia } from 'elysia';
import cors from '@elysiajs/cors';
import axios from 'axios';
import { config } from 'dotenv';

config(); // .env 파일 불러오기

const YELP_API_KEY = process.env.YELP_API_KEY;

export const app = new Elysia();

app.use(cors({
  origin: 'http://localhost:5173' // 프론트 주소만 허용 (또는 "*"로 전체 허용 가능)
}));
app.get('/', () => 'Hello from Elysia');
app.get('/search', async ({ query, set }) => {
  console.log('📩 Received /search request:', query.zip);
  const zip = query.zip;

  if (!zip) {
    set.status = 400;
    return { error: 'zip code is required' };
  }

  try {
    const response = await axios.get('https://api.yelp.com/v3/businesses/search', {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`
      },
      params: {
        location: zip,
        term: 'restaurants',
        limit: 15,
        open_now: true,
        sort_by: 'review_count' // filter에 따라서 달라질 것
        // price
        // attributes (parking, ambience, waitlist_reservation, hot_and_new, etc)
      }
    });

    return response.data.businesses;
  } catch (error) {
    console.error('Yelp API error:', error);
    set.status = 500;
    return { error: 'Failed to fetch from Yelp' };
  }
});
