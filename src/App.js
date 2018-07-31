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
        {/* routes to deal with python passing us "None" */}
        <Route path="/None" component={JobList} />
        <Route path="//None" component={JobList} />
        {/* end routes to deal with python passing us "None" */}

        <Route path="/:marketId" exact component={JobList} />
        <Route path="/:latitude/:longitude" component={JobList} />
        <Route path="/" component={JobList} />
      </Switch>
    </Router>
  </div>
);

export default App;
