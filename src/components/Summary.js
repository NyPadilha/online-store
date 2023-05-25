import React from 'react';

export default class Summary extends React.Component {
  render() {
    const productsOnCart = JSON.parse(localStorage.getItem('productsCart'));
    return (
      <section className="products-summary">
        <h2 className="summ-title">Revise seus Produtos</h2>
        <ul className="summary-list">
          {
            productsOnCart
              .map(({ title, thumbnail, price, amount }, index) => (
                <li className="list-summary" key={ index }>
                  <img src={ thumbnail } alt={ title } />
                  <div className="infos-wrapper">
                    <p className="s-name summ">{ title }</p>
                    <p className="s-price summ">
                      { `Preço: R$ ${price.toFixed(2).replace('.', ',')}` }
                    </p>
                    <p className="s-quant summ">{ `Quantidade: ${amount}` }</p>
                  </div>
                </li>))
          }
        </ul>
        <div className="total-wrapper">
          <p className="total-text">
            Total:
            { ' ' }
            {
              productsOnCart
                .reduce((total, { price, amount }) => total + (price * amount), 0)
                .toFixed(2).replace('.', ',')
            }
          </p>
        </div>
      </section>
    );
  }
}
