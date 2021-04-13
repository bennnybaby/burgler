import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        name: '',
        address: {
            street: 'Address1',
            zipcode: '68120',
            country: 'US'
        },
        email: ''
    }

    render () {
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Info</h4>
                <form>
                    <input className={classes.Input} type='text' name='name' placeholder='Your Name'></input>
                    <input className={classes.Input} type='text' name='email' placeholder='Your Email'></input>
                    <input className={classes.Input} type='text' name='stree' placeholder='Stree'></input>
                    <input className={classes.Input} type='text' name='postal' placeholder='ZIP Code'></input>
                    <Button btnType='Success'>ORDER</Button>
                </form>
            </div>
        )
    }
};

export default ContactData;