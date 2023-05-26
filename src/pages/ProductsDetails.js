import PropTypes from 'prop-types';
import React from 'react';
import { RiShoppingCartLine } from 'react-icons/ri';
import { getProductById } from '../services/api';
import Form from '../components/Form';
import Review from '../components/Review';

export default class ProductsDetails extends React.Component {
  state = {
    products: [],
    ratingState: 0,
    hover: 0,
    emailReview: '',
    textReview: '',
    showFormError: false,
    productReviews: [],
  };

  componentDidMount() {
    this.recoverReviews();
    this.productsById();
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

  productsById = async () => {
    const { match } = this.props;
    const { params: { id } } = match;
    const products = await getProductById(id);
    this.setState({
      products,
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
      products: { title, thumbnail, price, availableAmount },
      ratingState,
      hover,
      emailReview,
      textReview,
      showFormError,
      productReviews,
    } = this.state;

    const { addProductToCart, quantityOfItems } = this.props;
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
        <p data-testid="product-detail-name">
          { title }
        </p>
        <img
          data-testid="product-detail-image"
          src={ thumbnail }
          alt={ title }
        />
        <p data-testid="product-detail-price">{ price }</p>
        <button
          data-testid="product-detail-add-to-cart"
          type="button"
          onClick={ () => addProductToCart(title, thumbnail, price, availableAmount) }
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
