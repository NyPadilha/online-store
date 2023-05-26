import PropTypes from 'prop-types';
import React from 'react';
import { FaStar } from 'react-icons/fa';
import './StarRating.css';

export default class StarRating extends React.Component {
  render() {
    const {
      ratingState,
      hover,
      handleRatingChange,
      handleMouseEnter,
      handleMouseLeave,
    } = this.props;
    const stars = 5;
    return (
      <div className="stars-wrapper">
        {[...Array(stars)].map((star, index) => {
          const ratingValue = index + 1;

          return (
            <label key={ index }>
              <input
                data-testid={ `${ratingValue}-rating` }
                className="stars"
                type="radio"
                name="ratingState"
                value={ ratingValue }
                onClick={ () => handleRatingChange(ratingValue) }
              />
              <FaStar
                className="star"
                size={ 25 }
                color={ ratingValue <= (hover || ratingState) ? '#ffc107' : '#e4e5e9' }
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
  ratingState: PropTypes.number.isRequired,
};
