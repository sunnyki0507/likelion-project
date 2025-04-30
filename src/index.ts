import { Elysia } from 'elysia';
import { config } from 'dotenv';
import axios from 'axios';
// https://docs.developer.yelp.com/reference/v3_business_search
config(); // .env 파일 로드

const YELP_API_KEY = process.env.YELP_API_KEY;

const app = new Elysia();

app.get('/search', async ({ query, set }) => {
  const zip = query.zip;

  if (!zip) {
    set.status = 400;
    return { error: 'Zip code is required' };
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
        // categories: filtering 에서 가져오기
        // sort_by: filtering 에서 
        // price: 1
      }
    });

    return response.data.businesses;
  } catch (error) {
    console.error(error);
    set.status = 500;
    return { error: 'Failed to fetch from Yelp' };
  }
});

app.listen(3000, () => {
  console.log('🦊 Server is running at http://localhost:3000');
});
