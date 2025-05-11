// export interface TagFilters {
//     location: string;
//     category: "Asain Fusion"|"Carribean"|"Indian"|"Mediterranean"|"Chinese Food"|
//                 "Italian"|"Japanese"|"Thai";
//     distance: number;
//     ratings: 1|2|3|4|5;
//     delivery: boolean;
//     vegan: boolean;
// }

// // Change this to match the structure you're using in sampleTag
// export type Tags = TagFilters;  // Now Tags will have the same structure as TagFilters

export interface TagFilters {
    location: string
    category: string
    distance: number
    ratings: number
    delivery: boolean
    vegan: boolean
  }
  