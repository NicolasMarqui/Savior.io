import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import App from './App';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import DashBoard from './Components/DashBoard';

const Routing = () => {
    return( 
        <React.Fragment>
            <Router>
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={SignUp} />
                    <Route exact path="/dashboard/:nome" component={DashBoard} />
                </Switch>
            </Router>
        </React.Fragment>
    )
}

export default Routing;