import React from 'react'
import './homePage.scss'
import { useAppSelector } from '../../features/hooks'
import SearchFilmInput from '../../components/searchFilm/SearchFilmInput'
import MovieCard from '../../components/movieCard/MovieCard'


const Main: React.FC = () => {
  const movie = useAppSelector((state) => state.user.movieData)
  const error = useAppSelector((state) => state.user.fetchMovieError)

  const user = useAppSelector(state => state.user.userData)

  return (
    <>
      <div className='main__block'>
        {user.username.length > 0 ? '' :
          <p >Log in to create your list of favorite movies.</p> }
      </div>

      <SearchFilmInput></SearchFilmInput>
      <div className="favorite__page__movie__block">
        {
          movie.Actors  ? <MovieCard showDeleteButton={false} showAnimation={true} showFavoriteIcon={true} showDiscription={true} {...movie}></MovieCard> : ''
        }
        {
          error ? <span className='error'>{error}</span> : ''
        }
      </div>
    </>
  )
}

export default Main