import React from 'react';
import PropTypes from 'prop-types';
import barcode from '../assets/barcode.svg';
import visa from '../assets/visa.svg';
import master from '../assets/mastercard.svg';
import elo from '../assets/elo.svg';

export default class PaymentForm extends React.Component {
  render() {
    const { onInputChange, paymentMethod } = this.props;

    return (
      <form className="payment-form">
        <fieldset className="payment-field">
          <legend>Método de Pagamento</legend>
          <div className="ticket-wrapper">
            <p className="method-title">Boleto</p>
            <label
              className="pay-label"
              htmlFor="boleto"
            >
              <input
                data-testid="ticket-payment"
                type="radio"
                id="boleto"
                value="boleto"
                name="paymentMethod"
                onChange={ onInputChange }
                checked={ paymentMethod === 'boleto' }
              />
              <img src={ barcode } alt="icone de boleto" />
            </label>
          </div>
          <div className="cards-wrapper">
            <p className="method-title">Cartão de Crédito</p>
            <label
              className="pay-label"
              htmlFor="visa"
            >
              <input
                data-testid="visa-payment"
                type="radio"
                id="visa"
                value="visa"
                name="paymentMethod"
                onChange={ onInputChange }
                checked={ paymentMethod === 'visa' }
              />
              <img src={ visa } alt="icone da bandeira visa" />
            </label>
            <label
              className="pay-label"
              htmlFor="master"
            >
              <input
                data-testid="master-payment"
                type="radio"
                id="master"
                value="master"
                name="paymentMethod"
                onChange={ onInputChange }
                checked={ paymentMethod === 'master' }
              />
              <img src={ master } alt="icone da bandeira mastercard" />
            </label>
            <label
              className="pay-label"
              htmlFor="elo"
            >
              <input
                data-testid="elo-payment"
                type="radio"
                id="elo"
                value="elo"
                name="paymentMethod"
                onChange={ onInputChange }
                checked={ paymentMethod === 'elo' }
              />
              <img src={ elo } alt="icone da bandeira elo" />
            </label>
          </div>
        </fieldset>
      </form>
    );
  }
}

PaymentForm.propTypes = {
  paymentMethod: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
};
