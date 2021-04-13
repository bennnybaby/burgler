import React, { Component } from "react";
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burgar';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICE = {
    salad: 0.3,
    bacon: 1.0,
    cheese: 0.5,
    meat: 1
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        price: 4,
        items: 0,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount = () => {
        axios.get('https://my-burger-682f7-default-rtdb.firebaseio.com/ingredients.json')
            .then(res => {
                this.setState({ingredients: res.data})
            })
            .catch(err => {
                this.setState({error: true})
            });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        const oldPrice = this.state.price;
        const updatedPrice = oldPrice + INGREDIENT_PRICE[type];
        const updatedItems = this.state.items + 1;
        this.setState({price: updatedPrice, ingredients: updatedIngredients, items: updatedItems});
    };
        
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount === 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        const oldPrice = this.state.price;
        const updatedPrice = oldPrice - INGREDIENT_PRICE[type];
        const updatedItems = this.state.items - 1;
        this.setState({price: updatedPrice, ingredients: updatedIngredients, items: updatedItems});
    };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        // alert('You Continued!');
        

        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.price);
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    };

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null
        let burger = <Spinner></Spinner>
        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}></Burger>
                    <BuildControls 
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.price}
                        totItems={this.state.items}
                        ordered={this.purchaseHandler}></BuildControls>
                </Aux>
            );
            orderSummary =<OrderSummary 
                            ingredients={this.state.ingredients} 
                            totalPrice={this.state.price}
                            purchaseCancelled={this.purchaseCancelHandler}
                            purchaseContinued={this.purchaseContinueHandler}></OrderSummary>;

        };
        if (this.state.loading) {
            orderSummary = <Spinner></Spinner>
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
};

export default withErrorHandler(BurgerBuilder, axios);