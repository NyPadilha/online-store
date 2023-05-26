import React from 'react';
import { FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';

export default class Review extends React.Component {
  render() {
    const { rating, email, text } = this.props;
    return (
      <div className="review-card">
        <div className="rating-email">
          <p className="card-email" data-testid="review-card-email">{ email }</p>
          <div className="card-rating" data-testid="review-card-rating">
            {
              [...Array(rating)]
                .map((star, index) => <FaStar key={ index } color="#ffc107" />)
            }
          </div>
          <p
            className="card-evaluation"
            data-testid="review-card-evaluation"
          >
            { text }
          </p>
        </div>
      </div>
    );
  }
}

Review.propTypes = {
  rating: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
