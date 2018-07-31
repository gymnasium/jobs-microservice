import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

// components
import { JobsView } from './components';

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
