import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ProductsDetails from './pages/ProductsDetails';
import Checkout from './pages/Checkout';

export default class App extends React.Component {
  state = { quantityOfItems: 0 };

  addProductToCart = (title, thumbnail, price, availableAmount) => {
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
        availableAmount,
      };
      products.push(newProduct);
    }

    localStorage.setItem('productsCart', JSON.stringify(products));

    this.howMuchInCart();
  };

  howMuchInCart = () => {
    const productsInCart = JSON.parse(localStorage.getItem('productsCart'));
    if (!productsInCart) return;

    const quantityOfItems = productsInCart
      .reduce((quantity, { amount }) => quantity + amount, 0);
    this.setState({ quantityOfItems });
  };

  render() {
    const { quantityOfItems } = this.state;

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
                howMuchInCart={ this.howMuchInCart }
                quantityOfItems={ quantityOfItems }
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
                howMuchInCart={ this.howMuchInCart }
                quantityOfItems={ quantityOfItems }
              />)
          }
        />
        <Route path="/checkout" component={ Checkout } />
      </Switch>
    );
  }
}
