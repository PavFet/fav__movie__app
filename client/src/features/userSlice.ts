import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { defaultState, IMovie, SortMoviesPayloads } from './types/movieType'
import { IUser } from './types/userType'

const initialState = {
  defaultState,
  movieData: { ...defaultState},
  fetchMovieError: '',
  userData: {
    _id: '',
    username: '',
    password: '',
    movieList: [{...defaultState}],
  },
}


export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setMovie: (state, action:PayloadAction<IMovie>) => {
      const movieData = action.payload
      state.movieData = movieData
    },
    setFetchMovieError: (state, action:PayloadAction<string>) => {
      state.fetchMovieError = action.payload
    },
    setUser: (state, action:PayloadAction<IUser>) => {
      const userData = action.payload
      state.userData = userData
    },
    setSortMovies: (state,  action: PayloadAction<SortMoviesPayloads>) => {
      const  sort  = action.payload
      state.userData.movieList.sort((a, b) => Number(b[sort]) - Number(a[sort]))
    },
    logOut: (state) => {
      state.userData = initialState.userData
      state.movieData = initialState.movieData
    }
  }
})

export const { setMovie, setFetchMovieError, setUser, setSortMovies, logOut } = UserSlice.actions
