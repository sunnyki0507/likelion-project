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
			},
			{
				name: 'Spicy Buffalo',
				thumbnail: 'https://olo-images-live.imgix.net/60/6004f28a011547cc9dddf051a8af0a15.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=528&h=352&fit=fill&fm=png32&bg=transparent&s=ab796ccd722a3a8df304179d1c99694b',
				desc: 'Chrispy Chicken, Mozzo Cheese, Grilled Onion & Tomatoes, Lettuce, Garlic Sauce', 
				price: '$35'
			},
			{
				name: 'Beef Bacon',
				thumbnail: 'https://static.wixstatic.com/media/f1892b_9eb3c2200e344a62bcd111496947207c~mv2.png/v1/fill/w_594,h_462,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/epic-burger-chicagos-best-burger_0004_ed.png',
				desc: 'Beef Patty, Chedder Cheese, Beef Bacon, Grilled Onion & Tomatoes, Lettuce', 
				price: '$45'
			}
		],
		foodImageUrls: [
			'https://th.bing.com/th/id/OIP.hxrhoa-uGR01IqAn-0VQ3AHaEK?rs=1&pid=ImgDetMain',
			'https://sarahbakerhansen.com/wp-content/uploads/2022/03/drover-2240x1680.jpg',
			'https://woodsidepawprint.com/wp-content/uploads/2022/03/IMG-0166-900x675.jpg',
			'https://i0.wp.com/fromfoodiewithlove.com/wp-content/uploads/2022/06/Bradshaw-Burger-Review-rotated-e1656360760534.jpg?fit=600%2C800&ssl=1',
			'https://preview.redd.it/burger-champ-review-v0-a073rg7gj2fc1.jpg?width=1080&crop=smart&auto=webp&s=d27ddc5ecb063f8fdcae95ba338d51d67c754fe5',
			'https://i.insider.com/57bb3718db5ce951008b8195?width=800&format=jpeg&auto=webp'
		],
		reviews: [
			{
				authorName: 'Seunghyun Hwang',
				content: "If you're craving a solid, satisfying burger, Burger Haven delivers on flavor and comfort. The patty was juicy and cooked to perfection, with a nicely seared crust and just the right amount of seasoning. The buns were soft but held up well under the weight of toppings, and the balance between meat, veggies, and sauces was thoughtful—not overdone.Their classic cheeseburger hits all the right notes, but if you're feeling adventurous, the specialty burgers like the Smoky Bacon BBQ or the Spicy Jalapeño Crunch are worth trying. Sides like crispy fries or garlic parmesan tots round out the meal well. Veggie and plant-based options are available too, which is a big plus. The vibe is casual, with friendly service and a clean, cozy interior. Prices are reasonable for the portion size and quality.",
				rating: 4.5,
			},
			{
				authorName: "John D.",
				rating: 4,
				content: "Nice burgers but they don't look like the pictures on the website! I had the teriyaki char burger and enjoyed the flavors but couldn't taste teriyaki. My girlfriend had the garden salad without tomato and said it was worth every penny ($3) we also had sweet potato fries which was good not incredible or anything. They sadly forgot to put one extra side of sauce in our bag since we ordered online. Willing to try it again!",
    		},
		]
	},
	'2': {
		// Thai Spice
		popularMenus: [
			{
				name: 'Spring Rolls',
				thumbnail: 'https://www.cubesnjuliennes.com/wp-content/uploads/2021/01/Spring-Roll-Recipe.jpg',
				desc: 'Crispy rolls filled with vegetables, tofu, or other ingredients.',
				price: '$35'
			},
			{
				name: 'Thai Shrimp Tempura',
				thumbnail: 'https://khinskitchen.com/wp-content/uploads/2023/08/prawn-tempura-04.jpg',
				desc: 'Deep-fried shrimp and vegetables served with a sweet chili sauce.',
				price: '$22'
			},
			{
				name: 'Chicken Satay',
				thumbnail: 'https://www.wcrf.org/wp-content/uploads/2024/08/Chicken-Satay-Skewers-SQ.jpg',
				desc: 'Marinated chicken skewers grilled and served with peanut sauce',
				price: '$40'
			}
		],
		foodImageUrls: [
			'https://media-cdn2.greatbritishchefs.com/media/p5abv3mz/img82070.whqc_768x512q90.jpg',
			'https://s3-media0.fl.yelpcdn.com/bphoto/ZdqG0JhNzFTRQgk8vJZkbg/348s.jpg',
			'https://www.ocregister.com/wp-content/uploads/2022/03/OCR-L-Thai-WBOX-0324-Chaba-2.jpg?w=525',
			'https://images.squarespace-cdn.com/content/v1/57f2ed1615d5dbffa426147a/1494438149341-78QNATCTH9Y1DNI4BGJ1/DSC_0074.jpg?format=2500w',
			'https://cdn.vox-cdn.com/thumbor/iuwwXDWuYRqmkOGITADJ8qWH7As=/0x0:1280x960/1200x900/filters:focal(538x378:742x582):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/74070818/Vientiane_trio_1066.0.jpeg',
			'https://kiolyn-image-store-production.s3-us-west-1.amazonaws.com/20062321210708/1592982731641'
		],
		reviews: [
			{
				authorName: 'Sally K',
				content: 'If you’re looking for bold flavors and fast service, Tuk Tuk Thai Street Food absolutely delivers. This place nails that balance between quick, casual dining and legit Thai taste. The Drunken Noodles (Pad Kee Mao) were the highlight—spicy, garlicky, and packed with fresh basil and crisp veggies. The noodles had a nice char from the wok, and the portion was generous. I also tried the Tom Yum soup, which had a deeply tangy, citrusy broth with just enough heat to wake up your senses without overwhelming you. They have a good variety of protein options (including tofu and mock duck), and everything tasted fresh—not greasy or overly salty like at some places. I finished off with mango sticky rice, and it was perfect: warm, slightly salty coconut rice paired with cool, sweet mango slices. The restaurant itself is small but colorful and fun, with street-food-inspired décor and Thai pop music in the background. It is busy during peak hours, but service is surprisingly quick and friendly.',
				rating: 4.3,
			},
			{
				authorName: "Lexi J",
				rating: 4.7,
				content: "Tucked away in a quiet corner of town, Baan Thai Kitchen offers a warm, welcoming atmosphere and authentic Thai flavors that hit the spot. From the moment you walk in, the fragrant aromas of lemongrass, coconut milk, and chili promise a great meal—and for the most part, the restaurant delivers. The Pad Thai was a standout: perfectly chewy noodles, a tangy tamarind sauce, and just the right kick of heat. The green curry was rich, creamy, and packed with fresh vegetables and tender chicken—though it leaned a bit sweet for my taste. The spice levels are customizable, which is a big plus if you love heat (ask for “Thai spicy” if you dare). Service was fast and attentive, and the servers were happy to make recommendations. The decor is modest but charming, with traditional accents and soft lighting that makes for a relaxed dining experience."
    		},
		]
	},
	'4': {
		// Burger Palace.
		popularMenus: [
			{
				name: 'Duo Romana',
				thumbnail: 'https://tb-static.uber.com/prod/image-proc/processed_images/a1d24f97137fad761303a95e296bd6a5/a19bb09692310dfd41e49a96c424b3a6.jpeg',
				desc: 'When two become one! Choose your two favourite Classic or Romana recipes - or try something new - to enjoy side by side on a Romana base. For calories, see nutritional information',
				price: '$40'
			},
			{
				name: 'Queen Margherita',
				thumbnail: 'https://media-cdn.tripadvisor.com/media/photo-s/1b/18/34/a5/pizza-express.jpg',
				desc: 'All hail the queen. A whole creamy burrata sitting atop a tomato with garlic and mozzarella base. With fresh basil, Gran Milano cheese and extra virgin olive oil',
				price: '$42'
			},
			{
				name: 'Lombardy Speciale',
				thumbnail: 'https://a.mktgcdn.com/p/TOBPAX_NAhNOwFWuCcsurDyXXH5NNat-Fugej16ycsM/640x480.jpg',
				desc: 'Bresaola - thinly sliced cured beef, Italian artichokes and rocket on a base of mozzarella, béchamel and red onion. With truffle & lemon dressing and Gran Milano cheese',
				price: '$45'
			}
		],
		foodImageUrls: [
			'https://www.scotsman.com/jpim-static/image/2025/04/14/14/22/Queen-Margherita.jpeg?crop=3:2,smart&trim=&width=640&quality=65',
			'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/70/e2/4c/speciale-con-bufala-rosmarino.jpg?w=900&h=500&s=1',
			'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0b/1b/7e/4f/img-20160427-181603-01.jpg?w=900&h=500&s=1',
			'https://www.yourpizzaexpress.com/__static/bfc9cc6b-f2a0-4217-b048-4d69edd4e691/image_quad',
			'https://www.yourharlow.com/wp-content/uploads/2023/11/Screenshot-2023-11-17-at-16.38.46-1016x1024.png',
			'https://slicelife.imgix.net/6395/photos/original/136137001_998070277263260_2113361489647193529_n.jpg?auto=compress&auto=format'
		],
		reviews: [
			{
				authorName: 'Tom J',
				content: 'Pizza Express is a solid choice for a casual pizza night. The menu has a good variety—from classic Margherita to more adventurous options like the Pollo Forza or Sloppy Giuseppe. I went with the American Hot, and it was flavorful with just the right spice level. The crust was thin and crisp, and the tomato sauce tasted fresh—not too acidic or overpowering. The ambiance is relaxed and family-friendly, and the staff were attentive without hovering. Prices are a bit higher than your average pizza joint, but the quality and experience make it worth it. Bonus points for offering gluten-free bases and vegan cheese!',
				rating: 4.2,
			},
			{
				authorName: "Susan R",
				rating: 3,
				content: "Pizza Express has a nice concept, but the execution didn’t fully deliver. The place looks stylish and modern, but my BBQ Chicken pizza was underwhelming—the base was a bit too doughy, and the toppings were unevenly spread. Flavor-wise, it wasn’t bad, just not memorable. Service was polite but slow, even though the restaurant wasn’t too busy at the time. On the upside, their dough balls appetizer was warm and satisfying, and the drinks menu had a nice variety of soft and alcoholic options. It’s not a bad place to catch up with friends, but for the price point, I was expecting something a little more impressive.",
    		},
		]
	},
	'3': {
		// Noodle House
		popularMenus: [
			{
				name: 'Noodle Soups',
				thumbnail: 'https://cookingwithayeh.com/wp-content/uploads/2021/07/Vegetable-Noodle-Soup.jpg',
				desc: 'Fish Noodle Soup, Ginger Scallion Beef w/ Noodle, House Sauce Noodles w/ Pork, Kung Pao Chicken Noodle Soup, Marinated Pork Feet Noodle Soup, Prawn w/ Spicy Minced Pork Sauce Noodle Soup according to Tasty Noodle House ',
				price: '$27'
			},
			{
				name: 'Chow Mein',
				thumbnail: 'https://images.getrecipekit.com/20221130023757-untitled-design-12-3.png?aspect_ratio=16:9&quality=90&',
				desc: 'Shanghai Style Chow Mein, Chicken/Beef Chow Mein, Chicken & Shrimp Chow Mein, Chow Mein W/ Pickled Vegetable, Beef Chow Mein W/ Black Pepper Sauce, House Spicy Chicken/Beef Chow Mein',
				price: '$20'
			},
			{
				name: 'Fried Rice',
				thumbnail: 'https://cookingwithayeh.com/wp-content/uploads/2021/07/Vegetable-Noodle-Soup.jpg',
				desc: 'Combination Fried Rice, Basil Seafood Fried Rice',
				price: '$16'
			}
		],
		foodImageUrls: [
			'https://cdn.prod.website-files.com/5d3c9ac8850abcfddfc0630d/5e17e0c3ba9f9e0232ea7df0_5e167015fe72e65f695fe864_SpicyFish.jpeg',
			'https://cdn.prod.website-files.com/5d3c9ac8850abcfddfc0630d/5e7d4246d109358818796106_Shrimp_noodle_soup.jpg',
			'https://cdn.prod.website-files.com/5d3c9ac8850abcfddfc0630d/5e17e0b3cf338612627045c4_5e166c7515c27631c8a20612_CrabMeat.jpeg',
			'https://s3-media0.fl.yelpcdn.com/bphoto/7ybJeT5nS5fjHhM_ebM_gw/348s.jpg',
			'https://sinoinsocal.wordpress.com/wp-content/uploads/2016/01/tasty-noodle-house.jpg?w=584',
			'https://i.ytimg.com/vi/-TpcyS62xBo/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLA69ENWZmIBws-d-LIElyLkaG18uA'
		],
		reviews: [
			{
				authorName: 'Sora M',
				content: 'Noodle House is my go-to spot when I am craving comfort food. The menu is full of flavorful noodle dishes, and everything I’ve tried has been delicious. The beef pho is rich and aromatic, and the spicy miso ramen packs just the right amount of heat. Portions are generous, and the prices are reasonable. The atmosphere is laid-back, perfect for a quick lunch or a relaxed dinner. Staff is friendly and efficient, and food usually comes out fast—even during busy hours. Highly recommend if you’re in the mood for warm, slurpable goodness.',
				rating: 4.5,
			},
			{
				authorName: "Jay J",
				rating: 3,
				content: "Noodle House left me a little underwhelmed. I had high hopes after reading reviews, but the experience didn’t quite live up to the hype. The chicken pad Thai was too sweet and lacked depth of flavor. The noodles were a bit overcooked, and the veggies felt like an afterthought. On the plus side, the ambiance was nice—clean, modern, and quiet—and the servers were polite. It might have just been an off day, so I’m willing to give it another shot, maybe with the pho or ramen instead.",
    		},
		]
	},
	'6': {
		// Mediterranean Grill
		popularMenus: [
			{
				name: 'Falafel',
				thumbnail: 'https://static01.nyt.com/images/2024/01/10/multimedia/10Felafel-wqbp/10Felafel-wqbp-superJumbo.jpg',
				desc: 'A sandwich or wrap featuring fried chickpea patties. ',
				price: '$23'
			},
			{
				name: 'Gyro',
				thumbnail: 'https://tastesbetterfromscratch.com/wp-content/uploads/2023/07/Gyros-1.jpg',
				desc: 'A sandwich or wrap with seasoned lamb or chicken, often with onions and tomatoes. ',
				price: '$30'
			},
			{
				name: 'Chicken Kabab',
				thumbnail: 'https://simshomekitchen.com/wp-content/uploads/2022/04/tandoori-skewers.png',
				desc: 'A sandwich or wrap with marinated chicken, usually served with onions and tahini sauce. ',
				price: '$23'
			}
		],
		foodImageUrls: [
			'https://s3-media0.fl.yelpcdn.com/bphoto/w0ZWVCa6A7arbzX6bTpl1Q/348s.jpg',
			'https://popmenucloud.com/cdn-cgi/image/width=1920,height=1920,format=auto,fit=scale-down/umgxckeq/782cb22d-e59c-4dad-a7f7-b88dc019b48e.jpg',
			'https://www.restaurantnews.com/wp-content/uploads/2023/11/The-Great-Greek-Mediterranean-Grill-Accelerates-Expansion-With-the-Launch-of-Non-Traditional-Dining-Formats-feature.jpg',
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAmS-7vDJDTrVL4ubZFC-1wl0uAkA9jpgAnA&s',
			'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/f9/53/dd/semra-s-mediterranean.jpg?w=900&h=500&s=1',
			'https://rachelsgrill.com/wp-content/uploads/2021/07/Screen-Shot-2021-07-26-at-12.44.13-PM.png'
		],
		reviews: [
			{
				authorName: 'Ally K',
				content: 'Mediterranean Grill is a hidden gem for fresh, flavorful eats. I tried the lamb gyro plate, and it was incredible—the meat was tender and juicy, with just the right amount of spice. The hummus was creamy and smooth, clearly made in-house, and the warm pita bread was the perfect companion. Everything tasted fresh and made to order. The service was quick and friendly, and the staff took time to explain menu options. The portion sizes are generous, especially for the price, and I left full but not weighed down. It’s a great spot whether you’re grabbing lunch or enjoying a laid-back dinner.',
				rating: 4.7,
			},
			{
				authorName: "John D.",
				rating: 3.5,
				content: "Mediterranean Grill has potential, but there’s room for improvement. I ordered the chicken shawarma wrap, which had good flavor overall, but the chicken was slightly dry and needed more sauce. The tabbouleh side salad was fresh but too heavy on the parsley for my taste. The interior is clean but plain—more like a takeout spot than a dine-in experience. Service was polite, though not particularly warm or attentive. That said, I’d be open to coming back and trying something else on the menu, like the falafel or mixed grill platter. The ingredients are clearly fresh, and I think they just need a bit more consistency.",
    		},
		]
	},
	'5': {
		// Sushi Delight
		popularMenus: [
			{
				name: 'Nigiri',
				thumbnail: 'https://www.craftycookbook.com/wp-content/uploads/2024/04/nigiri-sushi-1200.jpg',
				desc: 'Sushi rice topped with a slice of fish or other seafood',
				price: '$25'
			},
			{
				name: 'Sashimi',
				thumbnail: 'https://www.manusmenu.com/wp-content/uploads/2016/05/2-Salmon-Sashimi-with-Ponzu-7-1-of-1.jpg',
				desc: 'Sliced fish or other seafood, served without rice.',
				price: '$28'
			},
			{
				name: 'Edamame',
				thumbnail: 'https://pinchofyum.com/wp-content/uploads/Garlic-Edamame-Final.jpg',
				desc: 'Steamed or boiled young soybeans in their pods.',
				price: '$12'
			}
		],
		foodImageUrls: [
			'https://s3-media0.fl.yelpcdn.com/bphoto/4CtLAS1BhFFk2EoqSka0Pw/348s.jpg',
			'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/d6/6f/eb/sushi-delight.jpg?w=900&h=500&s=1',
			'https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=1200,height=672,format=auto/https://doordash-static.s3.amazonaws.com/media/store/header/65fd12c6-9ed1-42ea-a73f-dfb718786a17.jpg',
			'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/23/da/19/e3/one-of-the-pleasures.jpg?w=900&h=500&s=1',
			'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/d6/6f/ec/sushi-delight.jpg?w=1200&h=1200&s=1',
			'https://s3-media0.fl.yelpcdn.com/bphoto/VedyjOak1H9SOFla3hUP3w/348s.jpg'
		],
		reviews: [
			{
				authorName: 'Jane R',
				content: 'Sushi Delight lives up to its name—fresh, tasty, and genuinely delightful. I visited on a weeknight and was impressed with both the quality of the sushi and the calm, cozy atmosphere. The Rainbow Roll was beautifully presented and packed with flavor, and the Spicy Tuna Roll had just the right amount of kick without overpowering the fish. The miso soup was light and well-balanced, and I appreciated the attentive service—the staff were friendly, gave great recommendations, and didn’t rush us. Prices are fair for the quality you get, especially compared to more upscale sushi spots. Perfect for a casual dinner date or a quiet solo meal with some sake on the side.',
				rating: 4.6,
			},
			{
				authorName: "Stephine J",
				rating: 3.3,
				content: "Sushi Delight has some high points, but it didn’t fully wow me. The presentation was nice and the staff were welcoming, but the sushi itself was hit or miss. The California Roll was bland, and the rice was a bit too sticky. However, the Dragon Roll and salmon nigiri were much better—fresh, well-cut, and flavorful. The atmosphere is clean but a bit cramped, and service was a little slow considering it wasn’t very busy. That said, the prices are reasonable, and they do offer good lunch specials, which might be worth trying again. If you go, stick to the specialty rolls or sashimi—those seem to be their strong suit.",
    		},
		]
	}
}

function getInfo(id: string) {
	return data[id]
}
