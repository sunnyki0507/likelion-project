import type { FilterState } from "../(components)/FilterModal"

export async function getRestaurantsFromFilters(filter: FilterState, location: string) {
  const category = filter.categories[0] || ""
  const pricing = filter.rating.toString()

  const params = new URLSearchParams({
    location,
    categories: category,
    pricing,
  })

  const url = `http://localhost:3000/search?${params.toString()}`
  console.log("Sending request to:", url)

  const res = await fetch(url)

  if (!res.ok) {
    console.error("API 요청 실패:", res.status, res.statusText)
    throw new Error("API 요청 실패")
  }

  const data = await res.json()
  console.log("받은 데이터:", data)

  return data
}



