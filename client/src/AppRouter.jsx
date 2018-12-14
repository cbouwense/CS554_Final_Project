import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import App from './App';
import { Home, Login, Register, ExerciseEventForm } from './components';

// ? I got an error trying to import it like other pages
import { ExerciseInfo } from './components/pages/ExerciseInfo';

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

          <Route path="/exerciseEvents/new" component={ExerciseEventForm} />
          <Route path="/exerciseInfo" component={ExerciseInfo} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
