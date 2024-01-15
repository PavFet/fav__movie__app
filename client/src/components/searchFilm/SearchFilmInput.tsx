import React from 'react'
import './searchFilmInput.scss'
import { fetchMovie } from '../../features/fetch'
import { useAppDispatch } from '../../features/hooks'


const SearchFilmInput = () => {

  const disp = useAppDispatch();

  const searchMovie: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const titleInput = (e.target as HTMLFormElement).elements.namedItem('title') as HTMLInputElement | null;
    const yearInput = (e.target as HTMLFormElement).elements.namedItem('year') as HTMLInputElement | null;
    
    if (titleInput && yearInput) {
      const movie = titleInput.value;
      const year = yearInput?.value;

      fetchMovie({movie, disp, year})

      titleInput.value = '';
      yearInput.value = '';
    }
  };

  return (
    <div className='search__block'>
      <form onSubmit={searchMovie}>
        <input 
          className='search__block--title'
          type="text" 
          name="title"
          placeholder='Title'
        />
        <input 
          className='search__block--year'
          type="text" 
          name="year"
          placeholder='Year'
        />
        <button 
          type='submit'
        >&#9740;</button>
      </form>
    </div>
  );
};

export default SearchFilmInput;

