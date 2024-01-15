import React from 'react'
import MovieCard from '../../components/movieCard/MovieCard'
import { useAppSelector } from '../../features/hooks'
import { IMovie } from '../../features/types/movieType'
import './favoriteMoviesPage.scss'
import ItemsPerPage from '../../components/filters/itemsPerPage/ItemsPerPage'
import MovieSort from '../../components/filters/movieSort/MovieSort'
import MovieFilterByGenre from '../../components/filters/movieFilter/MovieFilterByGenre'
import MovieSearchByTitle from '../../components/filters/movieSearchByTitle/MovieSearchByTitle'

const FavoriteMoviesPage = () => {

  const { movieList } = useAppSelector((state) => state.user.userData)

  const [genre, setGenre] = React.useState('')
  const [title, setTitle] = React.useState('')
  const [itemsPerPage, setItemsPerPage] = React.useState(3);
  const [currentPage, setCurrentPage] = React.useState(1);

  const indexOfLastMovieInList = currentPage * itemsPerPage;
  const indexOfFirstMovieInList = indexOfLastMovieInList - itemsPerPage;

  const filteredMovies = genre.length > 0 && genre !== 'All' 
    ? movieList.filter((movie) => movie.Genre.includes(genre))
    : movieList.filter((movie) => movie.Title.toLowerCase().startsWith(title.toLowerCase()))

  const  moviesForDisplay = filteredMovies.slice(indexOfFirstMovieInList, indexOfLastMovieInList)

  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage)
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
 
  const handleMoviesPerPageChange = (value: string) => {
    const valueToNumber = Number(value)
    setItemsPerPage(valueToNumber)
  }

  React.useEffect(() => {
    setTitle('')
  }, [genre])

  React.useEffect(() => {
    setCurrentPage(1);
  }, [genre, title]);

  if (totalPages < currentPage) {
    setCurrentPage(totalPages);
  }

  return (
    <>
      <div className="movies__filters__container">
        <div className="movies__filters__container__left">
          <ItemsPerPage setValue={handleMoviesPerPageChange}></ItemsPerPage>
          <MovieSearchByTitle titleValue={title} onTitleChange={setTitle}></MovieSearchByTitle>
        </div>
        <div className="movies__filters__container__right">
          <MovieSort></MovieSort>
          <MovieFilterByGenre selectedGenre={genre} onGenreChange={setGenre}></MovieFilterByGenre>
        </div>
      </div>
      {
        movieList.length > 0 ? 
          <>
            <div className='movie__list__container'>
              <ul className="item-list">
                { 
                  moviesForDisplay.map((movie: IMovie, index: number) =>
                    <MovieCard showAnimation={false} showDiscription={false} showDeleteButton={true} key={index} showFavoriteIcon={false} {...movie}  ></MovieCard>)
                }
              </ul>
            </div> 
            {
              moviesForDisplay.length > 0 ? 
                <div className="pagination__controls">
                  <button
                    className='pagination__btn pagination__btn--prev ' 
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}>
                      &#10092;
                  </button>

                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      className={`pagination__btn ${currentPage === index + 1 ? 'active' : ''}`} 
                      key={index}
                      onClick={() => handlePageChange(index + 1)}>
                      {index + 1}
                    </button>
                  ))}
  
                  <button
                    className='pagination__btn pagination__btn--next ' 
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}>
            &#10093;
                  </button>
                </div>
                :
                <p style={{color: 'white', textAlign: 'center' }}>
                No movies with {genre} genre
                </p>
            }
          </>
          :
          <p style={{color: 'white', textAlign: 'center'}}>
              Go to Home and make your own list of favorite movies by adding movies
          </p>
      }
    </>
  )
}

export default FavoriteMoviesPage