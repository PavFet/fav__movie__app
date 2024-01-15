import { IMovie } from "./movieType";

export interface IUser {
  _id: string,
  username: string,
  password: string,
  movieList: IMovie[],
}