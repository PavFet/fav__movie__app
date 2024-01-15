import React from 'react'
import './movieFilterByGenre.scss'
import { MovieGenres } from '../../../features/types/movieType';

interface MovieFilterProps {
  selectedGenre: string;
  onGenreChange: (genre: string) => void
}

const MovieFilterByGenre: React.FC<MovieFilterProps> = ({selectedGenre, onGenreChange}) => {

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value =  e.target.value as MovieGenres;
    onGenreChange(value);
  };

  return (
    <div>
      <form action="" className='form__movie__filter'>
        <select name="" id="" value={selectedGenre} onChange={handleChange}>
          <option value='' disabled selected>Filter by genre</option>
          <option value='Action'>Action</option>
          <option value='Animation'>Animation</option>
          <option value='Adventure'>Adventure</option>
          <option value='Comedy'>Comedy</option>
          <option value='Crime'>Crime</option>
          <option value='Drama'>Drama</option>
          <option value='Family'>Family</option>
          <option value='Fantasy'>Fantasy</option>
          <option value='Historical'>Historical</option>
          <option value='Horror'>Horror</option>
          <option value='Musical'>Musical</option>
          <option value='Mystery'>Mystery</option>
          <option value='Romance'>Romance</option>
          <option value='Sci-Fi'>Sci-Fi</option>
          <option value='Thriller'>Thriller</option>
          <option value='Western'>Western</option>
          <option value='All'>Show all</option>
        </select>
      </form>
    </div>
  )
}

export default MovieFilterByGenre