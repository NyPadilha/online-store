import PropTypes from 'prop-types';
import React from 'react';
import { getProductById } from '../services/api';

export default class ProductsDetails extends React.Component {
  state = {
    products: [],
  };

  componentDidMount() {
    this.productsById();
  }

  productsById = async () => {
    const { match } = this.props;
    const { params: { id } } = match;
    const products = await getProductById(id);
    this.setState({
      products,
    });
  };

  render() {
    const { products } = this.state;
    return (
      <div className="products-details">
        <p data-testid="product-detail-name">
          { products.title }
        </p>
        <img
          data-testid="product-detail-image"
          src={ products.thumbnail }
          alt={ products.title }
        />
        <p data-testid="product-detail-price">{ products.price }</p>
        <button data-testid="shopping-cart-button">Adicionar ao carrinho</button>
      </div>
    );
  }
}
ProductsDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
