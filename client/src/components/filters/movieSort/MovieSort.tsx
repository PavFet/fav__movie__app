import React from 'react'
import './movieSort.scss'
import { useAppDispatch } from '../../../features/hooks'
import { setSortMovies } from '../../../features/userSlice'
import { SortMoviesPayloads } from '../../../features/types/movieType'

const MovieFilters = () => {
  const [selectedSort, setSelectedSort] = React.useState('');

  const disp = useAppDispatch();
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value =  e.target.value as SortMoviesPayloads;
    disp(setSortMovies(value))
    setSelectedSort(value);
  };

  return (
    <div>
      <form action="" className='form__movie__filter'>
        <select name="" id="" value={selectedSort} onChange={handleChange}>
          <option value='' disabled selected>Sort by</option>
          <option value='Year'>Year</option>
          <option value='imdbRating'>Raiting</option>
        </select>
      </form>
    </div>
  )
}

export default MovieFilters