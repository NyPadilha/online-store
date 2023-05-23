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
      <div>
        { cart.length === 0
          ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          : (
            <section>
              <h2>shopping cart</h2>
              <section>
                {
                  cart.map(({ title, price, thumbnail, amount }) => (
                    <div key={ title } className="product-item">
                      <h4 data-testid="shopping-cart-product-name">{ title }</h4>
                      <img src={ thumbnail } alt={ title } />
                      <h5>{ `R$ ${price}` }</h5>
                      <h5
                        data-testid="shopping-cart-product-quantity"
                      >
                        { `Quantidade: ${amount}` }

                      </h5>
                    </div>

                  ))
                }
              </section>
            </section>)}
      </div>
    );
  }
}
