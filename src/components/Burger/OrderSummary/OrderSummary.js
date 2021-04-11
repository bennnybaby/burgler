import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    render () {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => (<li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}</li>))
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>Your burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.totalPrice.toFixed(2)}</strong></p>
                <p><strong>Continue to Checkout?</strong></p>
                <Button btnType='Success' clicked={this.props.purchaseContinued}>Checkout</Button>
                <Button btnType='Danger' clicked={this.props.purchaseCancelled}>Cancel</Button>
            </Aux>)
    }
};

export default OrderSummary;