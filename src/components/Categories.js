import React, { Component } from 'react';
import { getCategories } from '../services/api';

export default class Categories extends Component {
  state = {
    categoriesList: [],
  };

  componentDidMount() {
    this.getCategoriesApi();
  }

  getCategoriesApi = async () => {
    const categoriesList = await getCategories();
    // console.log(categoriesList);
    this.setState({
      categoriesList,
    });
  };

  render() {
    const categoryKey = 'id';
    const { categoriesList } = this.state;
    return (
      <div>
        {
          categoriesList.map((category) => (
            <label
              data-testid="category"
              htmlFor={ category[categoryKey] }
              key={ category[categoryKey] }
            >
              { category.name }
              <input type="radio" name=" Categorias: " id={ category[categoryKey] } />
            </label>
          ))
        }

      </div>
    );
  }
}
