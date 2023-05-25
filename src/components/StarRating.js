import PropTypes from 'prop-types';
import React from 'react';
import { FaStar } from 'react-icons/fa';
import './StarRating.css';

export default class StarRating extends React.Component {
  render() {
    const {
      rating,
      hover,
      handleRatingChange,
      handleMouseEnter,
      handleMouseLeave,
    } = this.props;
    const stars = 5;
    return (
      <div>
        {[...Array(stars)].map((star, i) => {
          const ratingValue = i + 1;

          return (
            <label key={ i }>
              <input
                // style={ { display: 'none' } }
                className="stars"
                type="radio"
                name="rating"
                value={ ratingValue }
                onClick={ () => handleRatingChange(ratingValue) }
              />
              <FaStar
                className="star"
                size={ 25 }
                color={ ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9' }
                onMouseEnter={ () => handleMouseEnter(ratingValue) }
                onMouseLeave={ () => handleMouseLeave(0) }
              />
            </label>
          );
        })}
      </div>
    );
  }
}

StarRating.propTypes = {
  handleMouseEnter: PropTypes.func.isRequired,
  handleMouseLeave: PropTypes.func.isRequired,
  handleRatingChange: PropTypes.func.isRequired,
  hover: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
};
