import React from 'react';
import Home from './Home';

export default class Cart extends React.Component {
  render() {
    return (
      <div>
        <Home />
        <h3 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h3>
      </div>
    );
  }
}
