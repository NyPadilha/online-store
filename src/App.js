import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ProductsDetails from './pages/ProductsDetails';

export default class App extends React.Component {
  addProductToCart = (title, thumbnail, price) => {
    const products = JSON.parse(localStorage.getItem('productsCart') || '[]');

    const existingProduct = products.find((product) => product.title === title);

    if (existingProduct) {
      existingProduct.amount += 1;
    } else {
      const newProduct = {
        title,
        thumbnail,
        price,
        amount: 1,
      };
      products.push(newProduct);
    }

    localStorage.setItem('productsCart', JSON.stringify(products));
  };

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={
            (props) => (
              <Home
                { ...props }
                addProductToCart={ this.addProductToCart }
              />)
          }
        />
        <Route path="/cart" component={ Cart } />
        <Route
          path="/product/:id"
          render={
            (props) => (
              <ProductsDetails
                { ...props }
                addProductToCart={ this.addProductToCart }
              />)
          }
        />
      </Switch>
    );
  }
}
