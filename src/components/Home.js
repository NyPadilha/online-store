import React from 'react';

export default class Home extends React.Component {
  // state = {
  //   productList: [],
  // };

  render() {
    return (
      <div>
        <input
          type="text"
        />
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <button
          type="submit"
        >
          Pesquisar
        </button>
      </div>
    );
  }
}
