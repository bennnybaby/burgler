import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burgar';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionType from '../../store/action';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false,
    };

    // componentDidMount = () => {
    //     axios.get('https://my-burger-682f7-default-rtdb.firebaseio.com/ingredients.json')
    //         .then(res => {
    //             this.setState({ingredients: res.data})
    //         })
    //         .catch(err => {
    //             this.setState({error: true})
    //         });
    // }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {...this.state.ingredients};
    //     updatedIngredients[type] = updatedCount;
    //     const oldPrice = this.state.price;
    //     const updatedPrice = oldPrice + INGREDIENT_PRICE[type];
    //     const updatedItems = this.state.items + 1;
    //     this.setState({price: updatedPrice, ingredients: updatedIngredients, items: updatedItems});
    // };

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if (oldCount === 0) {
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {...this.state.ingredients};
    //     updatedIngredients[type] = updatedCount;
    //     const oldPrice = this.state.price;
    //     const updatedPrice = oldPrice - INGREDIENT_PRICE[type];
    //     const updatedItems = this.state.items - 1;
    //     this.setState({price: updatedPrice, ingredients: updatedIngredients, items: updatedItems});
    // };

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinueHandler = () => {
        // const queryParams = [];
        // for (let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price=' + this.state.price);
        // const queryString = queryParams.join('&');
        this.props.history.push('/checkout');
    };

    render() {
        const disabledInfo = {
            ...this.props.ings,
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = <Spinner></Spinner>;
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}></Burger>
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        totItems={this.props.items}
                        ordered={this.purchaseHandler}
                    ></BuildControls>
                </Aux>
            );
            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ings}
                    totalPrice={this.props.price}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                ></OrderSummary>
            );
        }
        if (this.state.loading) {
            orderSummary = <Spinner></Spinner>;
        }

        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.price,
        items: state.items,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: ingName =>
            dispatch({
                type: actionType.ADD_INGREDIENT,
                ingredientName: ingName,
            }),
        onIngredientRemoved: ingName =>
            dispatch({
                type: actionType.REMOVE_INGREDIENT,
                ingredientName: ingName,
            }),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
