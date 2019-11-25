/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';

import { generateUTMSlug } from '../../util/util';

import './JobListing.css';

const generateURLForJob = (props) => {
  const { campaign, job, market } = props;

  let topLevelDomain = '.com';

  // australian job links require us to point to aquent.com.au!
  if (market && market.id) {
    switch (market.id) {
      case 36: // melbourne
      case 39: // sydney
        topLevelDomain = '.com.au';
        break;
      default:
        break;
    }
  }

  return `https://aquent${topLevelDomain}/find-work/${
    job.jobId
  }#content?${generateUTMSlug(campaign)}`;
};

const JobListing = (props) => {
  const { campaign, market, job } = props;

  if (!job) {
    return null;
  }

  // determine the city to display on this job
  // note: geocodecity is unreliable, but a reasonable fallback
  // we will display the job.marketId if it is a string (and not parseable as a number)
  let jobLocation = job.marketId;
  // try to parse this marketId as a number - if it is a number, we will use the geocode data
  if (!Number.isNaN(parseInt(job.city, 10))) {
    const stateDisplay = job.geocodeState ? `, ${job.geocodeState}` : null;
    jobLocation = `${job.geocodeCity}${stateDisplay}`;
  }

  return (
    <li className="row gym-microservice-job-listing">
      <a
        href={generateURLForJob({ campaign, job, market })}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="job-post">
          <b className="job-title col-xs-8">{job.title}</b>{' '}
          <em className="job-market col-xs-4 text-right">{jobLocation}</em>
        </div>
      </a>
    </li>
  );
};

JobListing.defaultProps = {
  campaign: 'job-module',
  job: null,
  market: null,
};

JobListing.propTypes = {
  campaign: PropTypes.string,
  job: PropTypes.shape({
    city: PropTypes.string,
    description: PropTypes.string,
    geocodeCity: PropTypes.string,
    geocodeState: PropTypes.string,
    jobId: PropTypes.string,
    marketId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
  }),
  market: PropTypes.shape({
    id: PropTypes.number,
  }),
};

export default JobListing;
