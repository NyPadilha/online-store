import PropTypes from 'prop-types';
import React from 'react';
import { RiShoppingCartLine } from 'react-icons/ri';
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

  toShoppingCart = () => {
    const { history } = this.props;
    history.push('/Cart');
  };

  render() {
    const { products: { title, thumbnail, price, availableAmount } } = this.state;
    const { addProductToCart } = this.props;
    return (
      <div className="products-details">
        <header className="header-details">
          <h1 className="detailstitle">Detalhes do produto</h1>
          <button
            type="button"
            data-testid="shopping-cart-button"
            onClick={ this.toShoppingCart }
          >
            <RiShoppingCartLine />
          </button>
        </header>
        <p data-testid="product-detail-name">
          { title }
        </p>
        <img
          data-testid="product-detail-image"
          src={ thumbnail }
          alt={ title }
        />
        <p data-testid="product-detail-price">{ price }</p>
        <button
          data-testid="product-detail-add-to-cart"
          type="button"
          onClick={ () => addProductToCart(title, thumbnail, price, availableAmount) }
        >
          Adicionar ao carrinho
        </button>
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
  addProductToCart: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
