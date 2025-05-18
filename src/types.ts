
export type Location = {
	country: string // USA, South Korea
	state: string // California, Seoul...
	city: string // L.A., Seoul.
	street: string // ...
  
	latitude: number
	longitude: number
}
  
export type Restaurant = {
	name: string
	grade: number // 0~10.0
	location: Location
	category: string[] // japanese, chinese, ...
}