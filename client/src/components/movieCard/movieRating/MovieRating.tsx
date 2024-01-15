import React from 'react'
import './movieRating.scss'

interface MovieRatingProps {
  rating: any
}

const MovieRating: React.FC<MovieRatingProps> = ({rating}) => {
  console.log(typeof rating)
  const gradientValue = parseFloat(rating) * 10

  const starStyle = {
    fontSize: '16.2px',
    background: `linear-gradient(85deg, rgba(223,217,17,1) 0%,  rgba(250,250,251,1) ${gradientValue}%)`,
    color: 'transparent',
  };

  const firstNumberInRating = parseFloat(rating[0])
  const secondNumberInRating = parseFloat(rating[2])

  const ratingScale = () => {
    const result = []
    const whiteStarsNumber = 10 - firstNumberInRating

    for (let i = 0; i < firstNumberInRating; i++) {
      result.push(<span key={`yellow-star-${i}`} className='star--yellow'>★
      </span>)
    }
    if (secondNumberInRating !== 0) {
      result.push(<span key="linear-star" className='star--linear' style={starStyle}>★
      </span>)
    } else {
      for (let i = 0; i < whiteStarsNumber; i++) {
        result.push(<span key={`white-star-${i}`} className='star--white' >★
        </span>)
      }
    }
    if (secondNumberInRating !== 0) {
      for (let i = 0; i < whiteStarsNumber - 1; i++) {
        result.push(<span key={`white-star-${i}`} className='star--white' >★
        </span>)
      }
    } 

    return result
  }
  return (
    <div  className='star__block' >
      {ratingScale()}
      <span  className='rating'>{rating} (IMDb)</span>
    </div>
  )
}

export default MovieRating