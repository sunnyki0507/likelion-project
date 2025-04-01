import { Elysia, t } from "elysia";
import { swagger } from '@elysiajs/swagger'

// const yelpApi = new YelpApi(apiToken)

// SY's friedn code.
//
// const serverURL = 'http://ksy.com:3000'
//
// const res = await fetch(serverURL + '/query')
// const body = await res.json()
//
// body.score_min
//

const app = new Elysia()
  .use(swagger())
  .post("/query", ({ body })=>{
    body.score_min *= 55

    return body
  }, {
		body: t.Object({
      score_min: t.Number(),
      score_max: t.Integer(),
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
