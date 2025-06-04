import { NextResponse } from 'next/server';

import type { RestaurantDetail } from "@/types/restaurant"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const info = getInfo(id)
  if (!info) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(info);
}

const data: { [id: string]: RestaurantDetail | undefined } = {
	'1': {
		// Burger Palace.
		popularMenus: [
			{
				name: 'Royale with Cheese',
				thumbnail: 'https://th.bing.com/th/id/OIP.KKKcvNXflvNT7tuzFr7dfwHaJP?rs=1&pid=ImgDetMain',
				desc: 'Cheese burger in French',
				price: '$40'
			}
		],
		foodImageUrls: [
			'https://th.bing.com/th/id/OIP.hxrhoa-uGR01IqAn-0VQ3AHaEK?rs=1&pid=ImgDetMain'
		],
		reviews: [
			{
				authorName: 'Seunghyun Hwang',
				content: 'not bad',
				rating: 2,
			},
			{
				authorName: "John D.",
				rating: 4,
				content: "Nice burgers but they don't look like the pictures on the website! I had the teriyaki char burger and enjoyed the flavors but couldn't taste teriyaki. My girlfriend had the garden salad without tomato and said it was worth every penny ($3) we also had sweet potato fries which was good not incredible or anything. They sadly forgot to put one extra side of sauce in our bag since we ordered online. Willing to try it again!",
    		},
		]
	}
}

function getInfo(id: string) {
	return data[id]
}
