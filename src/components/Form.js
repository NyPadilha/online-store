import PropTypes from 'prop-types';
import React from 'react';
import StarRating from './StarRating';

export default class Form extends React.Component {
  onCustomSubmit = (event) => {
    const { onReviewBtnClick } = this.props;
    event.preventDefault();
    onReviewBtnClick();
  };

  render() {
    const {
      ratingState,
      hover,
      handleRatingChange,
      handleMouseEnter,
      handleMouseLeave,
      emailReview,
      textReview,
      onInputReviewChange,
      showFormError,
    } = this.props;

    return (
      <div className="form-wrapper">
        <p className="review-title">Avaliação</p>
        <form
          className="form-review"
          onSubmit={ this.onCustomSubmit }
        >
          <div className="ratingState-email">
            <input
              type="text"
              name="emailReview"
              value={ emailReview }
              data-testid="product-detail-email"
              placeholder="Email"
              onChange={ onInputReviewChange }
            />
            <StarRating
              ratingState={ ratingState }
              hover={ hover }
              handleMouseEnter={ handleMouseEnter }
              handleMouseLeave={ handleMouseLeave }
              handleRatingChange={ handleRatingChange }
            />
          </div>
          <textarea
            id="avaliacao"
            type="text"
            name="textReview"
            value={ textReview }
            data-testid="product-detail-evaluation"
            placeholder="Mensagem (opcional)"
            onChange={ onInputReviewChange }
          />
          {
            showFormError
              && <p data-testid="error-msg" className="error-msg">Campos inválidos</p>
          }
          <button
            type="submit"
            data-testid="submit-review-btn"
            className="review-btn"
            onSubmit={ this.onCustomSubmit }
          >
            Avaliar
          </button>
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  handleMouseEnter: PropTypes.func.isRequired,
  handleMouseLeave: PropTypes.func.isRequired,
  handleRatingChange: PropTypes.func.isRequired,
  hover: PropTypes.number.isRequired,
  ratingState: PropTypes.number.isRequired,
  emailReview: PropTypes.string.isRequired,
  textReview: PropTypes.string.isRequired,
  onInputReviewChange: PropTypes.func.isRequired,
  onReviewBtnClick: PropTypes.func.isRequired,
  showFormError: PropTypes.bool.isRequired,
};
