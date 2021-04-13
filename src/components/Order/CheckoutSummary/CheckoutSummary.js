import React from 'react';
import Burger from '../../Burger/Burgar';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>Here is your Burger!!!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}></Burger>
            </div>
            <Button btnType='Success' clicked={props.checkoutContinued}>CHECKOUT</Button>
            <Button btnType='Danger' clicked={props.checkoutCancelled}>CANCEL</Button>
        </div>

    );
};

export default checkoutSummary;