import { getRestaurants } from "../(api)/getRestaurants";
import ViewSelector from "../(components)/ViewSelector";

const sampleTag: Tags = {
    location: "irvine",
    category: "Thai",
    distance: 5,
    ratings: 4,
    delivery: true,
    vegan: false,
}

export default async function HomePage() {
    const restaurants = await getRestaurants({ tags: sampleTag, size: 5 });

    return (
        <>
            <ViewSelector initRestaurants={restaurants}/>
        </>
    );
}