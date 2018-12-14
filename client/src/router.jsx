import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import App from './App';
import { Home, Login, Register } from './components';

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <App>
                <Switch>
                    <Route exact path="/" component={Home} />
                    
                    {/* Login and Registration */}
                    <Route path="/account/login" component={Login} />
                    <Route path="/account/register" component={Register} />
                </Switch>
           </App>
        </BrowserRouter>
    )
}
