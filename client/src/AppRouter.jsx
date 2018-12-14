import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import App from './App';
import { Home, Login, Register, Profile, ExerciseEventForm } from './components';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <div>
        <Route component={App} />
        <Switch>
          <Route exact path="/" component={Home} />

          {/* Login and Registration */}
          <Route path="/account/login" component={Login} />
          <Route path="/account/register" component={Register} />
          <Route path="/account/profile" component={Profile} />

          <Route path="/exerciseEvents/new" component={ExerciseEventForm} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
