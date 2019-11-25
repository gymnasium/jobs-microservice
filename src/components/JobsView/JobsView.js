import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import qs from 'query-string';

import { fetchJobs, getMarketFromURLParams } from '../../util/util';

import { JobList, JobTable } from '..';

const JobsView = ({ location, match }) => {
  const { latitude, longitude, marketId, view: initialView } = match.params;

  const [initialMarket /* , setInitialMarket */] = useState(() =>
    getMarketFromURLParams(marketId, latitude, longitude),
  );
  const [market, setMarket] = useState(initialMarket);

  const [jobs, setJobs] = useState({});
  const [loading, setLoading] = useState(true);
  const [view] = useState(initialView);
  const [options] = useState(() => {
    const parsed = qs.parse(location.search);

    const { cwid } = parsed;

    // split cloudwallid string (cwid) into an array of integers
    // which we will use to query for multiple minor segments
    const cwids =
      (typeof cwid === 'string' && cwid.length > 0 && cwid.split(',')) || null;

    return {
      cwids,
    };
  });

  const handleJobsLoaded = loadedJobs => {
    setJobs(loadedJobs);
    setLoading(false);
  };

  const searchForJobsAsync = useCallback(async marketOverride => {
    try {
      let currentMarketId = market.id;
      if (marketOverride && marketOverride.id) {
        currentMarketId = marketOverride.id;
        setMarket(marketOverride);
      }

      const jobsFound = await fetchJobs(currentMarketId, options);
      handleJobsLoaded(jobsFound);
    } catch (e) {
      console.log('error', e.message || e);
    }
    setLoading(false);
  }, [market.id, options]);

  // search for jobs on initial mount/render/load
  useEffect(() => {
    searchForJobsAsync();
  }, [market, options, searchForJobsAsync]);

  switch (view) {
    case 'table':
      return (
        <JobTable
          initialMarket={initialMarket}
          jobs={jobs}
          market={market}
          refreshJobsList={searchForJobsAsync}
          loading={loading}
        />
      );
    default:
      return (
        <JobList
          jobs={jobs}
          market={market}
          marketChanged={searchForJobsAsync}
        />
      );
  }
};

JobsView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({}),
  }).isRequired,
  location: PropTypes.shape({}).isRequired,
};

export default JobsView;
