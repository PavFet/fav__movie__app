import React from 'react'
import './movieDiscExtension.scss'

const MovieDiscExtension = (props: any) => {
  return (
    <div className='movie__extention'>
      <p>Realease: {props.Released}</p>
      <p>Director: {props.Director}</p>
      <p>Writer: {props.Writer}</p>
      <p>Country: {props.Country}</p>
      <p>Awards: {props.Awards}</p>
      <p>Box office: {props.BoxOffice}</p>
    </div>
  )
}

export default MovieDiscExtension