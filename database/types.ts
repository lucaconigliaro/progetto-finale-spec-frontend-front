type Details = {
  platform: string[];
  releaseYear: number;
  rating: number;
  developer: string;
  price: number;
  players: string[];
  ageRating: string;
  regionAvailability: string[];
  description: string;
};

export type Game = {
  readonly id: number;
  readonly title: string;
  readonly category: string;
  details: Details
};
