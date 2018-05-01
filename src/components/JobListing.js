/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';

import { generateUTMSlug } from '../util/util';

const generateURLForJob = (props) => {
  const { campaign, job } = props;
  return `https://aquent.com/find-work/${job.jobId}?${generateUTMSlug(campaign)}`;
};

const JobListing = (props) => {
  const { campaign, job } = props;

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
    <li className="row">
      <a href={generateURLForJob({ campaign, job })} target="_blank">
        <b className="job-title col-xs-8">{job.title}</b>
        {' '}
        <em className="job-market col-xs-4 text-right">{jobLocation}</em>
      </a>
    </li>
  );
};

JobListing.defaultProps = {
  campaign: 'job-module',
  job: null,
};

JobListing.propTypes = {
  campaign: PropTypes.string,
  job: PropTypes.shape({
    description: PropTypes.string,
    jobId: PropTypes.string,
    title: PropTypes.string,
  }),
};

export default JobListing;
