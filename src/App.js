import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ProductsDetails from './pages/ProductsDetails';

export default class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/cart" component={ Cart } />
        <Route path="/product/:id" component={ ProductsDetails } />
      </Switch>
    );
  }
}
