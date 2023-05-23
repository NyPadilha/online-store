import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import ProductCard from './ProductCard';

export default class ProductCardList extends React.Component {
  render() {
    const { productsToRender } = this.props;
    return (
      <ul className="product-list">
        {
          productsToRender.map((product) => {
            const { id, title, thumbnail, price } = product;
            return (
              <Link key={ id } to={ `product/${id}` } data-testid="product-detail-link">
                <ProductCard
                  key={ id }
                  title={ title }
                  thumbnail={ thumbnail }
                  price={ price }
                />
              </Link>
            );
          })
        }
      </ul>
    );
  }
}

ProductCardList.propTypes = {
  productsToRender: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
