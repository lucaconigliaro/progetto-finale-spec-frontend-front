export type Game = {
  readonly id: number;
  readonly title: string;
  readonly category: string;
  platform: string;
  releaseYear: number;
  rating: number;
  developer: string;
  price: number;
  players: string;
  ageRating: string;
  regionAvailability: string[];
  description: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
};