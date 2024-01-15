interface Rating {
  Source: string,
  Value: string,
}

export interface IMovie {
  Title: string,
  Year: string,
  Rated: string,
  Released: string,
  Runtime: string,
  Genre: string,
  Director: string,
  Writer: string,
  Actors: string,
  Plot: string,
  Language: string,
  Country: string,
  Awards: string,
  Poster: string,
  Ratings: Array<Rating>,
  Metascore: string,
  imdbRating: string,
  imdbVotes: string,
  imdbID: string,
  Type: string,
  DVD: string,
  BoxOffice: string,
  Production: string,
  Website: string,
  Response: string,
  sort?: any,
}

export const defaultState: IMovie = {
  Title: "",
  Year: "",
  Rated: "",
  Released: "",
  Runtime: "",
  Genre: "",
  Director: "",
  Writer: "",
  Actors: "",
  Plot: "",
  Language: "",
  Country: "",
  Awards: "",
  Poster: "",
  Ratings: [],
  Metascore: "",
  imdbRating: "",
  imdbVotes: "",
  imdbID: "",
  Type: "",
  DVD: "",
  BoxOffice: "",
  Production: "",
  Website: "",
  Response: "",
}

export type SortMoviesPayloads =  'Year' | 'imdbRating'
export type MovieGenres =  
'Fantasy' |
'Thriller' |
'Drama' |
'Adventure' |
'Horror' |
'Romance' |
'Western' |
'Historical' |
'Comedy' |
'Musical' |
'Crime' |
'Sci-F' |
'Animation' |
'Mystery' 


type OptionalProps<T> = {
  [K in keyof T]?: T[K];
};


export interface IMovieOptional extends OptionalProps<IMovie> {}