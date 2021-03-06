import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

class App extends Component {
    render() {
        return (
            <div>
                <Layout>
                    <Route path="/checkout" component={Checkout}></Route>
                    <Route path="/orders" component={Orders}></Route>
                    <Route path="/" exact component={BurgerBuilder}></Route>
                </Layout>
            </div>
        );
    }
}

export default App;
