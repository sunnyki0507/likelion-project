import { Elysia, t } from "elysia";
import { swagger } from '@elysiajs/swagger'
import { searchPlugin } from './search' 

const app = new Elysia()
  .use(swagger())
  .use(searchPlugin)
  .post("/query", ({ body })=>{
    body.score_min *= 99

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
  
  .listen(3000, () => {
    console.log('🚀 Backend running on http://localhost:3000')
  }
// console.log(
//   `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
