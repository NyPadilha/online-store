import PropTypes from 'prop-types';
import React from 'react';
import StarRating from './StarRating';

export default class Form extends React.Component {
  render() {
    const {
      rating,
      hover,
      handleRatingChange,
      handleMouseEnter,
      handleMouseLeave,
    } = this.props;

    return (
      <div>
        <form>
          <label htmlFor="email">
            <input
              id="email"
              type="email"
              name="email"
              data-testid="product-detail-email"
              placeholder="E-mail"
            />

          </label>
          <div className="forms">
            <StarRating
              rating={ rating }
              hover={ hover }
              handleMouseEnter={ handleMouseEnter }
              handleMouseLeave={ handleMouseLeave }
              handleRatingChange={ handleRatingChange }
            />
          </div>

          <label htmlFor="avaliacao">
            <textarea
              id="avaliacao"
              type="text"
              name="text"
              data-testid="product-detail-evaluation"
              placeholder="Mensagem (opcional)"
            />
          </label>

          <button
            type="submit"
            value="Avaliar"
            data-testid="submit-review-btn"
          >
            Avaliar
          </button>

          {/* {errorMsg && <p data-testid="error-msg">Campos Inválidos</p>} */}
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
  rating: PropTypes.number.isRequired,
};
