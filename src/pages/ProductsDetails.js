import PropTypes from 'prop-types';
import React from 'react';
import { RiShoppingCartLine } from 'react-icons/ri';
import { getProductById } from '../services/api';
import Form from '../components/Form';
import Review from '../components/Review';

export default class ProductsDetails extends React.Component {
  state = {
    product: '',
    ratingState: 0,
    hover: 0,
    emailReview: '',
    textReview: '',
    showFormError: false,
    productReviews: [],
  };

  componentDidMount() {
    this.recoverReviews();
    this.productById();
    const { howMuchInCart } = this.props;
    howMuchInCart();
  }

  handleRatingChange = (ratingValue) => {
    this.setState({
      ratingState: ratingValue,
    });
  };

  handleMouseEnter = (ratingValue) => {
    this.setState({
      hover: ratingValue,
    });
  };

  handleMouseLeave = () => {
    this.setState({
      hover: 0,
    });
  };

  productById = async () => {
    const { match } = this.props;
    const { params: { id } } = match;
    const product = await getProductById(id);
    this.setState({
      product,
    });
  };

  toShoppingCart = () => {
    const { history } = this.props;
    history.push('/Cart');
  };

  onInputReviewChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  validateReview = () => {
    const { ratingState, emailReview } = this.state;

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const emailIsvalid = emailRegex.test(emailReview);

    const ratingIsValid = ratingState !== 0;

    return emailIsvalid && ratingIsValid;
  };

  onReviewBtnClick = () => {
    const { ratingState, emailReview, textReview } = this.state;
    const { match: { params: { id } } } = this.props;

    const newReview = { rating: ratingState, email: emailReview, text: textReview };

    if (this.validateReview()) {
      this.setState((prev) => ({
        productReviews: [...prev.productReviews, newReview],
      }), () => {
        this.setState({ ratingState: 0, emailReview: '', textReview: '' });

        const { productReviews } = this.state;
        localStorage.setItem(id.toString(), JSON.stringify(productReviews));
      });

      this.setState({ showFormError: false });

      return;
    }

    this.setState({ showFormError: true });
  };

  recoverReviews = () => {
    const { match: { params: { id } } } = this.props;
    const recoveredReviews = JSON.parse(localStorage.getItem(id.toString()));
    if (!recoveredReviews) return;
    if (recoveredReviews.length > 0) {
      this.setState({ productReviews: recoveredReviews });
    }
  };

  render() {
    const {
      product: { title, thumbnail, price, attributes, shipping },
      product,
      ratingState,
      hover,
      emailReview,
      textReview,
      showFormError,
      productReviews,
    } = this.state;

    const { addProductToCart, quantityOfItems } = this.props;

    if (!product) return (<h1>Carregando...</h1>);

    return (
      <div className="products-details">
        <header className="header-details">
          <h1 className="detailstitle">Detalhes do produto</h1>
          <button
            type="button"
            data-testid="shopping-cart-button"
            onClick={ this.toShoppingCart }
          >
            <RiShoppingCartLine />
            <p
              data-testid="shopping-cart-size"
              className="quantity"
            >
              { quantityOfItems }
            </p>
          </button>
        </header>
        <div className="product-wrapper">
          <div className="product-infos">
            <p data-testid="product-detail-name">
              { title }
            </p>
            {
              shipping.free_shipping
                && (
                  <p
                    data-testid="free-shipping"
                    className="free-shipping"
                  >
                    Frete Grátis!
                  </p>)
            }
            <img
              data-testid="product-detail-image"
              src={ thumbnail }
              alt={ title }
            />
            <p
              data-testid="product-detail-price"
              style={ { display: 'none ' } }
            >
              { price }
            </p>
            <p
              className="detail-price"
            >
              { `R$ ${price.toFixed(2).replace('.', ',')}` }
            </p>
          </div>
          <div className="details-wrapper">
            <ul className="details-list">
              {
                attributes.filter((attribute) => attribute.value_name !== null)
                  .map((attributeMap) => (
                    <li className="detail-item" key={ attributeMap.id }>
                      <p className="detail-name">
                        { `${attributeMap.name}: ${attributeMap.value_name}` }
                      </p>
                    </li>
                  ))
              }
            </ul>
          </div>
        </div>
        <button
          data-testid="product-detail-add-to-cart"
          type="button"
          onClick={ () => addProductToCart(
            title,
            thumbnail,
            price,
            product.available_quantity,
          ) }
        >
          Adicionar ao carrinho
        </button>
        <Form
          ratingState={ ratingState }
          hover={ hover }
          emailReview={ emailReview }
          textReview={ textReview }
          onInputReviewChange={ this.onInputReviewChange }
          handleMouseEnter={ this.handleMouseEnter }
          handleMouseLeave={ this.handleMouseLeave }
          handleRatingChange={ this.handleRatingChange }
          onReviewBtnClick={ this.onReviewBtnClick }
          showFormError={ showFormError }
        />
        <div className="reviews-wrapper" />
        {
          productReviews.length > 0 && productReviews.map((review, index) => {
            const { rating, email, text } = review;
            return (
              <Review
                key={ index }
                rating={ rating }
                email={ email }
                text={ text }
              />
            );
          })
        }
      </div>
    );
  }
}
ProductsDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  addProductToCart: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  howMuchInCart: PropTypes.func.isRequired,
  quantityOfItems: PropTypes.number.isRequired,
};
