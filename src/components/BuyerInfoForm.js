import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import statesOfBrazil from '../utils/statesOfBrazil';

export default class BuyerInfoForm extends React.Component {
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
      onInputChange,
      showFormError,
    } = this.props;

    return (
      <form className="buyer-form">
        <fieldset className="buyer-info">
          <legend>Informações do Comprador</legend>
          <div className="line1">
            <Input
              dataTestid="checkout-fullname"
              name="fullName"
              value={ fullName }
              placeHolder="Nome Completo"
              onInputChange={ onInputChange }
            />
            <Input
              dataTestid="checkout-cpf"
              name="cpf"
              value={ cpf }
              placeHolder="CPF"
              onInputChange={ onInputChange }
            />
            <Input
              dataTestid="checkout-email"
              type="email"
              name="email"
              value={ email }
              placeHolder="Email"
              onInputChange={ onInputChange }
            />
            <Input
              dataTestid="checkout-phone"
              name="phone"
              value={ phone }
              placeHolder="Celular"
              onInputChange={ onInputChange }
            />
          </div>
          <div className="line2">
            <Input
              dataTestid="checkout-cep"
              name="cep"
              value={ cep }
              placeHolder="CEP"
              onInputChange={ onInputChange }
            />
            <Input
              dataTestid="checkout-address"
              name="address"
              value={ address }
              placeHolder="Endereço"
              onInputChange={ onInputChange }
            />
          </div>
          <div className="line3">
            <Input
              name="addressComplement"
              value={ addressComplement }
              placeHolder="Complemento"
              onInputChange={ onInputChange }
            />
            <Input
              name="addressNumber"
              value={ addressNumber }
              placeHolder="Número"
              onInputChange={ onInputChange }
            />
            <Input
              name="city"
              value={ city }
              placeHolder="Cidade"
              onInputChange={ onInputChange }
            />
            <select
              className="state-select"
              name="countryState"
              value={ countryState }
              onChange={ onInputChange }
            >
              <option defaultValue>Estado</option>
              {
                statesOfBrazil.map((state) => (
                  <option
                    key={ Object.keys(state) }
                    value={ Object.keys(state) }
                  >
                    { Object.values(state) }
                  </option>))
              }
            </select>
          </div>
        </fieldset>
        {
          showFormError
            && <p data-testid="error-msg" className="error-msg">Campos inválidos</p>
        }
      </form>
    );
  }
}

BuyerInfoForm.propTypes = {
  fullName: PropTypes.string.isRequired,
  cpf: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  cep: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  addressComplement: PropTypes.string.isRequired,
  addressNumber: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  countryState: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  showFormError: PropTypes.bool.isRequired,
};
