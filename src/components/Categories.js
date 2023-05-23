import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Categories extends Component {
  render() {
    const categoryKey = 'id';
    const { categoriesList, selectedCategory, onCategoryChange } = this.props;
    return (
      <form className="categories-form">
        {
          categoriesList.map((category) => (
            <label
              data-testid="category"
              htmlFor={ category[categoryKey] }
              key={ category[categoryKey] }
            >
              { category.name }
              <input
                type="radio"
                value={ category[categoryKey] }
                checked={ selectedCategory === category[categoryKey] }
                onChange={ onCategoryChange }
                id={ category[categoryKey] }
              />
            </label>
          ))
        }

      </form>
    );
  }
}

Categories.propTypes = {
  categoriesList: PropTypes.instanceOf(Array).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
};
