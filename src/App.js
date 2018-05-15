import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

// components
import { JobList } from './components';

const App = (/* props */) => (
  <div className="App">
    <Router>
      <Switch>
        <Route path="/:marketId" exact component={JobList} />
        <Route path="/:latitude/:longitude" component={JobList} />
        <Route path="/" component={JobList} />
      </Switch>
    </Router>
  </div>
);

export default App;
