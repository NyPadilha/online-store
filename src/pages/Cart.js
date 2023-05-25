import React from 'react';
import { IoRemoveSharp, IoAddOutline } from 'react-icons/io5';
import { FaRegTrashAlt } from 'react-icons/fa';
import '../Css/Cart.css';

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

  AddProduct = (e) => {
    const { cart } = this.state;
    const update = cart;
    const index = cart.findIndex(
      (find) => find.title === e.target.parentNode.children[0].innerHTML,
    );
    if (update[index].availableAmount > update[index].amount) {
      update[index].amount += 1;
    }
    this.setState({
      cart: update,
    }, () => {
      localStorage.productsCart = JSON.stringify(update);
    });
  };

  SubtractProduct = (e) => {
    let verify = e.target.parentNode.children[3].innerHTML;
    verify = parseInt(verify.split('Quantidade:')[1], 10);
    if (verify > 1) {
      const { cart } = this.state;
      const update = cart;
      const index = cart.findIndex(
        (find) => find.title === e.target.parentNode.firstChild.innerHTML,
      );
      update[index].amount -= 1;
      this.setState({
        cart: update,
      }, () => { localStorage.productsCart = JSON.stringify(update); });
    }
  };

  DiscardProduct = (e) => {
    const { cart } = this.state;
    const produtoRemover = e.target.parentNode.firstChild;
    const listupdated = cart.filter((find) => find.title !== produtoRemover.innerHTML);
    this.setState({
      cart: listupdated,
    }, () => {
      localStorage.setItem('productsCart', JSON.stringify(listupdated));
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
                      <IoAddOutline
                        onClick={ this.AddProduct }
                        data-testid="product-increase-quantity"
                      />
                      <IoRemoveSharp
                        onClick={ this.SubtractProduct }
                        data-testid="product-decrease-quantity"
                      />
                      <FaRegTrashAlt
                        onClick={ this.DiscardProduct }
                        data-testid="remove-product"
                      />
                    </li>

                  ))
                }
              </ul>
            </section>)}
      </div>
    );
  }
}
