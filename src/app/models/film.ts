import { Actor } from './actor';

export class Film {
  id: number;
  title: string;
  description: string;
  releaseYear: number;
  rating: string;
  length: number;
  actors: Array<Actor>;

  constructor (id?: number, title?: string, description?: string,
    releaseYear?: number, rating?: string, length?: number, actors?: Array<Actor>) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.releaseYear = releaseYear;
    this.rating = rating;
    this.length = length;
    this.actors = actors;
  }
}
