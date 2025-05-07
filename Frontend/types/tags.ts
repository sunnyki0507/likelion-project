interface Tags {
    location: string;
    category: "Asain Fusion"|"Carribean"|"Indian"|"Mediterranean"|"Chinese Food"|
                "Italian"|"Japanese"|"Thai";
    distance: number;
    ratings: 1|2|3|4|5;
    delivery: boolean;
    vegan: boolean;
}