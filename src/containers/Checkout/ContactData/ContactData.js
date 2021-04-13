import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        address: {
            street: '',
            zipcode: '',
            country: ''
        },
        email: '',
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Ben',
                address: {
                    street: 'Address1',
                    zipcode: '68120',
                    country: 'US'
                },
                email: 'xxx@gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(res => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({loading: false});
            });
    }

    render () {
        let form = (
            <form>
                <input className={classes.Input} type='text' name='name' placeholder='Your Name'></input>
                <input className={classes.Input} type='text' name='email' placeholder='Your Email'></input>
                <input className={classes.Input} type='text' name='stree' placeholder='Stree'></input>
                <input className={classes.Input} type='text' name='postal' placeholder='ZIP Code'></input>
                <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner></Spinner>;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Info</h4>
                {form}
            </div>
        )
    }
};

export default ContactData;