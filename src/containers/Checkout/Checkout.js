import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {
    // state = {
    //     ingredients: null,
    //     totPrice: 0
    // }

    // UNSAFE_componentWillMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = null;
    //     for (let param of query.entries()) {
    //         if (param[0] === 'price'){
    //             price=param[1]
    //         }
    //         else {
    //             ingredients[param[0]] = +param[1];
    //         }
    //     }
    //     this.setState({ingredients:ingredients, totPrice: price});
    // }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                ></CheckoutSummary>
                <Route
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData}
                ></Route>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
    };
};

export default connect(mapStateToProps)(Checkout);
