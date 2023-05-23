import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { RiShoppingCartLine, RiSearchLine } from 'react-icons/ri';
import Categories from '../components/Categories';
import { getProductsFromCategoryAndQuery } from '../services/api';
import ProductCardList from '../components/ProductCardList';

export default class Home extends React.Component {
  state = {
    productList: [],
    searchTerm: '',
    searchBtnWasClicked: false,
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  getProductsFromQuery = async () => {
    const { searchTerm } = this.state;
    const { results } = await getProductsFromCategoryAndQuery(searchTerm);
    this.setState({ productList: results }, () => {
      this.setState({ searchBtnWasClicked: true });
    });
  };

  customSubmit = async (event) => {
    event.preventDefault();
    await this.getProductsFromQuery();
  };

  render() {
    const { productList, searchTerm, searchBtnWasClicked } = this.state;
    return (
      <div className="home-wrapper">
        <Categories />
        <form
          className="search-form"
          onSubmit={ this.customSubmit }
        >
          <input
            type="text"
            data-testid="query-input"
            name="searchTerm"
            value={ searchTerm }
            onChange={ this.onInputChange }
            placeholder="Digite o que você busca"
            className="input-search"
          />
          { productList.length === 0 && (
            <span data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </span>) }
          <button
            data-testid="query-button"
            type="button"
            onClick={ this.getProductsFromQuery }
          >
            <RiSearchLine />
          </button>
        </form>
        <Link
          to="/cart"
          data-testid="shopping-cart-button"
        >
          <RiShoppingCartLine />
        </Link>
        {
          searchBtnWasClicked && (
            productList.length === 0
              ? <h1>Nenhum produto foi encontrado</h1>
              : (
                <div className="results-wrapper">
                  <ProductCardList productList={ productList } />
                </div>)
          )
        }
      </div>
    );
  }
}
