import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/';

export default class ProductCard extends React.Component {
  render() {
    const { id, title, thumbnail, price, availableAmount,
      addProductToCart } = this.props;
    return (
      <li
        data-testid="product"
        className="product-card"
      >
        <Link to={ `/product/${id}` } data-testid="product-detail-link">
          <p className="product-name">{ title }</p>
          <img className="product-img" src={ thumbnail } alt={ title } />
          <p className="product-price">{ price }</p>
        </Link>
        <button
          data-testid="product-add-to-cart"
          type="button"
          onClick={ () => addProductToCart(title, thumbnail, price, availableAmount) }
        >
          Adicionar ao Carrinho
        </button>
      </li>
    );
  }
}

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  availableAmount: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  addProductToCart: PropTypes.func.isRequired,
};
