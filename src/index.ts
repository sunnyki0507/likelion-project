import { Elysia, t } from "elysia";
import { swagger } from '@elysiajs/swagger'

import {Restaurant} from './types'
import {fakeRestaurants} from './fake'



const app = new Elysia()
  .use(swagger())
  // .post("/query/:keyword", ({ body, params })=>{
  //   const res: Restaurant[] = []
  //   for(const v of fakeRestaurants) {
  //     if(!v.name.toLowerCase().includes(params.keyword.toLowerCase())) {
  //       continue
  //     }
  //     if(v.grade < body.grade_min) {
  //       continue
  //     }
  //     if(v.grade > body.grade_max) {
  //       continue
  //     }

  //     res.push(v)
  //   }

  //   return res
  // }, {
	// 	body: t.Object({
  //     grade_min: t.Number(),
  //     grade_max: t.Number(),
  //     place: t.Array(t.Object({
  //       state: t.String(),
  //       city: t.String(),
  //     }))
  //   })
  // })
  .get("/restaurant/recommend", ()=>{
    const N = fakeRestaurants.length
    const res: Restaurant[] = [
      fakeRestaurants[Math.floor(Math.random() * N)],
      fakeRestaurants[Math.floor(Math.random() * N)],
      fakeRestaurants[Math.floor(Math.random() * N)],
    ]

    return res
  })
  .post("/restaurant/like", ()=>{
    const user_id = "some_id"// current user
    // db.update()
    // ...
  })
  .get("/restaurant/like", ()=>{
    const user_id = "some_id"// current user
    // const values = db.select().where(user_id == ${user_id}).all()
    // ...
  })
  .post("/query", ({ body })=>{
    const res: Restaurant[] = []
    for(const v of fakeRestaurants) {
      if(v.grade < body.grade_min) {
        continue
      }
      if(v.grade > body.grade_max) {
        continue
      }

      res.push(v)
    }

    return res
  }, {
		body: t.Object({
      grade_min: t.Number(),
      grade_max: t.Number(),
      place: t.Array(t.Object({
        state: t.String(),
        city: t.String(),
      }))
    })
  })
  .get("/restorants/:id", async ({params})=> {
    // TODO: return deatils of restorant.


    // const id = params.id
    // const res = await yelpApi.getDetail(id)

    // return res
    return "Hello"
  })
  .get("/a", ()=> "KSY")
  .listen(4000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
