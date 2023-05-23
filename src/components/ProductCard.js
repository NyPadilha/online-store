import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/';

export default class ProductCard extends React.Component {
  addProductToCart = (title, thumbnail, price) => {
    const products = JSON.parse(localStorage.getItem('productsCart') || '[]');
    const product = {
      title,
      thumbnail,
      price,
      amount: 1,
    };
    // console.log(product);

    if (products.length > 0) {
      const found = products
        .filter((productLStorage) => productLStorage.title === product.title);

      // console.log(found);

      // console.log(sum);

      if (found.length > 0) {
        let sum = found[0].amount;
        const newProducts = products
          .filter((productLS) => productLS.title !== product.title);
        sum += 1;
        product.amount = sum;
        newProducts.push(product);
        localStorage.setItem('productsCart', JSON.stringify(newProducts));
      } else {
        // products.push(product);
        const newProducts2 = [...products, product];
        localStorage.setItem('productsCart', JSON.stringify(newProducts2));
      }
    } else {
      const newProducts3 = [...products, product];
      localStorage.setItem('productsCart', JSON.stringify(newProducts3));
    }
  };

  render() {
    const { title, thumbnail, price, id } = this.props;

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
          onClick={ () => this.addProductToCart(title, thumbnail, price) }
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
  id: PropTypes.string.isRequired,
};
