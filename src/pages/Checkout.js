import React from 'react';
import PropTypes from 'prop-types';
import BuyerInfoForm from '../components/BuyerInfoForm';
import PaymentForm from '../components/PaymentForm';
import Summary from '../components/Summary';

export default class Checkout extends React.Component {
  state = {
    fullName: '',
    cpf: '',
    email: '',
    phone: '',
    cep: '',
    address: '',
    addressComplement: '',
    addressNumber: '',
    city: '',
    countryState: '',
    paymentMethod: '',
    showFormError: false,
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  validateForm = () => {
    const { fullName, email, cpf, phone, cep, address, paymentMethod } = this.state;
    const minNameLength = 2;
    const exactCpfAndPhoneLength = 11;
    const exactCepLength = 8;
    const minAddressLength = 2;

    const splitedName = fullName.split(' ');
    const nameIsValid = (splitedName.length >= minNameLength)
      ? splitedName.every((name) => name.length >= minNameLength)
      : false;

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const emailIsvalid = emailRegex.test(email);

    const cpfIsValid = (Number(cpf)) ? cpf.length === exactCpfAndPhoneLength : false;

    const phoneIsValid = (Number(phone))
      ? phone.length === exactCpfAndPhoneLength : false;

    const cepIsValid = (Number(cep)) ? cep.length === exactCepLength : false;

    const splitedAddress = address.split(' ');
    const addressIsValid = splitedAddress.length >= minAddressLength;

    const paymentMethodIsValid = paymentMethod.length !== 0;

    const formIsValid = nameIsValid && emailIsvalid
      && cpfIsValid && phoneIsValid
      && phoneIsValid && cepIsValid && addressIsValid && paymentMethodIsValid;

    return formIsValid;
  };

  onCheckoutBtnClick = () => {
    if (this.validateForm()) {
      localStorage.removeItem('productsCart');
      const { history } = this.props;
      history.push('/');
      return;
    }

    this.setState({ showFormError: true });
  };

  render() {
    const {
      fullName,
      cpf,
      email,
      phone,
      cep,
      address,
      addressComplement,
      addressNumber,
      city,
      countryState,
      paymentMethod,
      showFormError,
    } = this.state;

    return (
      <main>
        <Summary />
        <BuyerInfoForm
          fullName={ fullName }
          cpf={ cpf }
          email={ email }
          phone={ phone }
          cep={ cep }
          address={ address }
          addressComplement={ addressComplement }
          addressNumber={ addressNumber }
          city={ city }
          countryState={ countryState }
          onInputChange={ this.onInputChange }
          showFormError={ showFormError }
        />
        <PaymentForm
          paymentMethod={ paymentMethod }
          onInputChange={ this.onInputChange }
        />
        <hr />
        <button
          data-testid="checkout-btn"
          className="checkout-btn"
          type="button"
          onClick={ this.onCheckoutBtnClick }
        >
          Comprar
        </button>
      </main>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
