import React from 'react'
import './movieCard.scss'
import MovieRating from './movieRating/MovieRating'
import MovieDiscExtension from './movieDiscExtension/MovieDiscExtension'
import { useAppDispatch, useAppSelector } from '../../features/hooks'
import http from '../../plugins/http'
import { setUser } from '../../features/userSlice'
import AddMovieModal from '../modal/addMovie/AddMovieModal'
import ArrowIcon from '../../svg/ArrowIcon'
import TrashIcon from '../../svg/TrashIcon'
import { IMovieOptional } from '../../features/types/movieType'


interface MovieCardProps extends IMovieOptional {
  showAnimation: boolean;
  showFavoriteIcon: boolean;
  showDiscription: boolean;
  showDeleteButton: boolean;
}

const MovieCard: React.FC<MovieCardProps> = (props) => {
  
  const [openMovieExtension, setOpenMovieExtension] = React.useState(false)
  const [modalOpen, setModalOpen] = React.useState(false);

  const movie = useAppSelector(state => state.user.movieData)
  const user = useAppSelector(state => state.user.userData)

  const disp = useAppDispatch()

  const toggleModal = (val: boolean) => {
    setModalOpen(val)
  }

  const addMovieToFavorite = async () =>  {
    await http.patch({userId: user._id, movieData: movie}, 'user/addMovie')
      .then(data => {
        disp(setUser(data.user))
      }
      )
  }

  const removeMovieFromFavorite = async () => {
    await http.delete({userId: user._id, movieTitle: props.Title}, 'user/deleteMovie')
      .then(data => {
        disp(setUser(data.user))
      })
  }

  return (
    <div className={props.showAnimation ? 'movie__card showAnimation' : 'movie__card'}>
      <div className="movie__poster">
        <img src={props.Poster} alt={props.Title} />
        {
          props.showFavoriteIcon === true && user.username.length > 0 &&  
          <>
            <span onClick={() => {
              addMovieToFavorite()
              toggleModal(true)
            }} className='favorite__icon'>
        &#10010;
            </span>
            <AddMovieModal isOpen={modalOpen} onClose={() => toggleModal(false)}>
          Added
            </AddMovieModal>
          </>
        }
      </div>

      <div className="movie__discription">
        <div className="movie__title">
          <h3>{props.Title} ({props.Year})</h3>
        </div>
        
        <div className="movie__duration__genre">
          <span>{props.Runtime} | {props.Genre}</span>
        </div>

        <div className="movie__rating">
          <MovieRating rating={props.imdbRating}></MovieRating>
        </div>
       
        { props.showDiscription &&
          <> 
            <div className="movie__actors">
              <p>Cast: {props.Actors}</p>
            </div>
            <div className="movie__plot">
              <p>Plot: {props.Plot}</p>
            </div>

            <div className="movie__disc__expansion">
              <button 
                onClick={() => setOpenMovieExtension(!openMovieExtension)}
                className={openMovieExtension ? 'arrow--up' : 'arrow--down'}
              >
                <ArrowIcon></ArrowIcon>
              </button>
              <div className={openMovieExtension ? "animation--showUp" : ''}>
                {openMovieExtension ? <MovieDiscExtension {...props}></MovieDiscExtension> : ''}
              </div>
            </div>
          </>
        }
      </div>

      { props.showDeleteButton && 
      <div className="movie__delete">
        <button onClick={removeMovieFromFavorite}>
          <TrashIcon></TrashIcon>
        </button>
      </div>
      }
    </div>
  )
}

export default MovieCard