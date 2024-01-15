import { Document } from 'mongoose';

interface IRating {
  Source: string;
  Value: string;
}

export interface IMovie {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Array<IRating>;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export interface IUser extends Document {
  readonly username: string;
  readonly password: string;
  readonly movieList: Array<IMovie>;
}

export interface LoginUser extends Omit<IUser, 'movieList'> {}
