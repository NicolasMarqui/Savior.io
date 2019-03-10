import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import App from './App';
import Login from './Components/Login';

const Routing = () => {
    return( 
        <React.Fragment>
            <Router>
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route exact path="/login" component={Login} />
                </Switch>
            </Router>
        </React.Fragment>
    )
}

export default Routing;