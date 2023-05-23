import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { RiShoppingCartLine, RiSearchLine } from 'react-icons/ri';
import Categories from '../components/Categories';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import ProductCardList from '../components/ProductCardList';

export default class Home extends React.Component {
  state = {
    fetchedProductList: [],
    searchTerm: '',
    showProducts: false,
    categoriesList: [],
    selectedCategory: '',
  };

  componentDidMount() {
    this.getCategoriesApi();
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  getCategoriesApi = async () => {
    const categoriesList = await getCategories();
    this.setState({
      categoriesList,
    });
  };

  getProductsFromQueryOrCat = async (cat, query) => {
    const { results } = await getProductsFromCategoryAndQuery(cat, query);
    this.setState({ fetchedProductList: results }, () => {
      this.setState({ showProducts: true });
    });
  };

  onSearchbtnClick = async () => {
    const { searchTerm } = this.state;
    await this.getProductsFromQueryOrCat(null, searchTerm);
  };

  customSubmit = async (event) => {
    event.preventDefault();
    const { searchTerm } = this.state;
    await this.getProductsFromQueryOrCat(null, searchTerm);
  };

  onCategoryChange = ({ target }) => {
    this.setState({ selectedCategory: target.value }, async () => {
      const { selectedCategory } = this.state;
      console.log(selectedCategory);
      await this.getProductsFromQueryOrCat(selectedCategory, null);
    });
  };

  render() {
    const {
      fetchedProductList,
      searchTerm,
      showProducts,
      categoriesList,
      selectedCategory,
    } = this.state;

    return (
      <div className="home-wrapper">
        <Categories
          categoriesList={ categoriesList }
          selectedCategory={ selectedCategory }
          onCategoryChange={ this.onCategoryChange }
        />
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
          { fetchedProductList.length === 0 && (
            <span data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </span>) }
          <button
            data-testid="query-button"
            type="button"
            onClick={ this.onSearchbtnClick }
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
          showProducts && (
            fetchedProductList.length === 0
              ? <h1>Nenhum produto foi encontrado</h1>
              : (
                <div className="results-wrapper">
                  <ProductCardList productsToRender={ fetchedProductList } />
                </div>)
          )
        }
      </div>
    );
  }
}
