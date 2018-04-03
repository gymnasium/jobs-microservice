import React, { Component } from 'react';
import { map } from 'lodash';

import './App.css';

import {
  fetchJobsForMarket,
  generateUTMSlug,
  getMarketFromLatLong,
} from './util/util';

// components
import { JobListing } from './components';

class App extends Component {
  state = {
    jobs: {},
  };

  constructor(props) {
    super(props);
    const market = getMarketFromLatLong({
      latitude: 35.227087,
      longitude: -80.843127,
    });

    fetchJobsForMarket(market.id).then(this.handleJobsLoaded);
  }

  handleJobsLoaded = jobs => {
    this.setState({
      jobs,
    });
  };

  render() {
    const { jobs } = this.state;
    return (
      <div className="App">{map(jobs, job => <JobListing job={job} />)}</div>
    );
  }
}

export default App;
