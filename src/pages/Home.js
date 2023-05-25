import React from 'react';
import { RiShoppingCartLine, RiSearchLine } from 'react-icons/ri';
import PropTypes from 'prop-types';
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

    const { howMuchInCart } = this.props;
    howMuchInCart();
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
      await this.getProductsFromQueryOrCat(selectedCategory, null);
    });
  };

  toShoppingCart = () => {
    const { history } = this.props;
    history.push('/Cart');
  };

  render() {
    const {
      fetchedProductList,
      searchTerm,
      showProducts,
      categoriesList,
      selectedCategory,
    } = this.state;

    const { addProductToCart, quantityOfItems } = this.props;

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
        <button
          type="button"
          data-testid="shopping-cart-button"
          onClick={ this.toShoppingCart }
        >
          <RiShoppingCartLine />
          <p
            data-testid="shopping-cart-size"
            className="quantity"
          >
            { quantityOfItems }
          </p>
        </button>
        {
          showProducts && (
            fetchedProductList.length === 0
              ? <h1>Nenhum produto foi encontrado</h1>
              : (
                <div className="results-wrapper">
                  <ProductCardList
                    productsToRender={ fetchedProductList }
                    addProductToCart={ addProductToCart }
                  />
                </div>)
          )
        }
      </div>
    );
  }
}

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  addProductToCart: PropTypes.func.isRequired,
  howMuchInCart: PropTypes.func.isRequired,
  quantityOfItems: PropTypes.number.isRequired,
};
