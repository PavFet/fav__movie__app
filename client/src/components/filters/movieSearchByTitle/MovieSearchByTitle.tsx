import React from 'react'
import './movieSearchByTitle.scss'

interface MovieSearchByTitleProps {
  titleValue: string;
  onTitleChange: (title: string) => void;
}

const MovieSearchByTitle: React.FC<MovieSearchByTitleProps> = ({titleValue, onTitleChange}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =  e.target.value as string;
    onTitleChange(value);
  };

  const handleClearTitle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    onTitleChange('')
  }

  return (
    <div>
      <form className="form__search" action="">
        <input 
          className='input__search'
          type="text" 
          placeholder='Search by title'
          value={titleValue}
          onChange={handleChange}
        />
        {
          titleValue && <button onClick={handleClearTitle}>X</button>
        }
      </form>
    </div>
  )
}

export default MovieSearchByTitle