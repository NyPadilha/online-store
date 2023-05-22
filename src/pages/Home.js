import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Categories from '../components/Categories';

export default class Home extends React.Component {
  state = {
    productList: [],
  };

  render() {
    const { productList } = this.state;
    return (
      <div>
        <Categories />
        <input
          type="text"
        />
        { productList.length === 0 && (
          <span data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </span>) }
        <Link
          to="/cart"
          data-testid="shopping-cart-button"
        />
        <button
          type="submit"
        >
          Pesquisar
        </button>
      </div>
    );
  }
}
