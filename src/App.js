import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

// components
import { JobsView } from './components';


// this sets up the URL scheme for this microservice.
// we expect the url to look like:
// {baseURL}/{viewtype}/[params]
// baseURL is the URL where the microservice lives
// View is the type of view we're looking for (table vs default, etc)
// any other parameters are decided on by the view which is rendered.
const App = (/* props */) => (
  <div className="App">
    <Router>
      <Switch>
        <Route path="/:view/:latitude/:longitude" component={JobsView} />
        <Route path="/:view/:marketId" component={JobsView} />
        <Route path="/:view" component={JobsView} />
        <Route path="/" component={JobsView} />
      </Switch>
    </Router>
  </div>
);

export default App;
