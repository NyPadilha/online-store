import React from 'react';

export default class Cart extends React.Component {
  state = {
    cart: [],
  };

  componentDidMount() {
    this.getProductsLocalStorage();
  }

  getProductsLocalStorage = () => {
    const products = JSON.parse(localStorage.getItem('productsCart') || '[]');
    this.setState({
      cart: products,
    });
  };

  render() {
    const { cart } = this.state;
    return (
      <div className="cart-wrapper">
        { cart.length === 0
          ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          : (
            <section className="cart">
              <h1>Carrinho de compras</h1>
              <ul className="cart-list">
                {
                  cart.map(({ title, price, thumbnail, amount }) => (
                    <li key={ title } className="product-item">
                      <p data-testid="shopping-cart-product-name">{ title }</p>
                      <img src={ thumbnail } alt={ title } />
                      <p>{ `R$ ${price}` }</p>
                      <p
                        data-testid="shopping-cart-product-quantity"
                      >
                        { `Quantidade: ${amount}` }

                      </p>
                    </li>

                  ))
                }
              </ul>
            </section>)}
      </div>
    );
  }
}
