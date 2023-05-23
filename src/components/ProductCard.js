import React from 'react';
import PropTypes from 'prop-types';

export default class ProductCard extends React.Component {
  render() {
    const { title, thumbnail, price } = this.props;

    return (
      <li
        data-testid="product"
        className="product-card"
      >
        <p className="product-name">{ title }</p>
        <img className="product-img" src={ thumbnail } alt={ title } />
        <p className="product-price">{ price }</p>
      </li>
    );
  }
}

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};
