/* eslint-disable import/prefer-default-export */

import fetch from 'isomorphic-fetch';
import { REMOTE_MARKET } from './constants';

export const loadJobs = async (marketId, options = {}) => {
  const {
    cwids, // an array of minor segments that we're searching for
    limit,
    page,
  } = options;

  const isRemoteSearch = marketId === REMOTE_MARKET.id;

  let remoteQuery = '';
  if (isRemoteSearch) {
    // offsitePreference values:
    // 1: on-site
    // 2: off-site
    // 3: either
    remoteQuery =
      '+(AquentJob.offsitePreference:2%20AquentJob.offsitePreference:3)';
  }

  let marketQuery = '';
  if (marketId) marketQuery = `%20+AquentJob.locationId:${marketId}`;

  // clear out market query if this is a remote job
  if (isRemoteSearch) marketQuery = '';

  let minorSegmentQuery = '';
  if (Array.isArray(cwids) && cwids.length > 0) {
    // to search for a list of minor segments, we need to provide it to the ODATA api in
    // the following format:
    // (ID1%20ID2%20)
    // basically, this is a list of IDs, separated by %20, and wrapped in Parenthesis
    const minorSegmentList = cwids.reduce(
      (accumulator, segment) => `${accumulator}%20${segment}`
    );

    minorSegmentQuery = `%20+AquentJob.minorSpecialty1:(${minorSegmentList})`;
  }

  let limitQuery = '';
  if (limit) limitQuery = `/limit/${limit}`;

  let pageQuery = '';
  if (page) pageQuery = `/offset/${page}`;

  const urlBase = `https://aquent.com/api/content/render/false/type/json/query/+contentType:AquentJob%20${remoteQuery}+AquentJob.isPosted:true%20+languageId:1%20+deleted:false%20+working:true`;
  const urlPageLimitSuffix = `/orderby/AquentJob.postedDate%20desc${limitQuery}${pageQuery}`;

  // attempt 1: include everything - Market and minor segments
  let apiUrl = `${urlBase}${marketQuery}${minorSegmentQuery}${urlPageLimitSuffix}`;
  let jobs = await jobsApiCall(apiUrl);

  if (jobs.length <= 0) {
    if (minorSegmentQuery.length > 0) {
      // we got no jobs for this market and minor segment(s) combination,
      // so let's try _any jobs_ for the given minor segments
      apiUrl = `${urlBase}${minorSegmentQuery}${urlPageLimitSuffix}`;
      jobs = await jobsApiCall(apiUrl);

      if (jobs.length <= 0) {
        // we got no jobs for this minor segment, let's try any jobs for this market at all
        apiUrl = `${urlBase}${marketQuery}${urlPageLimitSuffix}`;
        jobs = await jobsApiCall(apiUrl);
      }

      if (jobs.length <= 0) {
        // we got no jobs for this set of minor segments,
        // and no jobs for this specific market, so let's
        // query for _any jobs anywhere_ and return that.
        apiUrl = `${urlBase}${urlPageLimitSuffix}`;
        jobs = await jobsApiCall(apiUrl);
      }
    } else {
      // Final fallback - query for _any jobs anywhere_ and return that.
      apiUrl = `${urlBase}${urlPageLimitSuffix}`;
      jobs = await jobsApiCall(apiUrl);
    }
  }

  return jobs;
};

const jobsApiCall = async (queryUrl) => {
  try {
    const response = await fetch(queryUrl, {
      contentType: 'application/json',
      dataType: 'jsonp',
    });
    if (response.status <= 200) {
      const body = await response.text();
      const jobs = JSON.parse(body).contentlets;
      return jobs;
    }
    console.error('an error has occurred.');
    return null;
  } catch (err) {
    console.error('Error retrieving jobs:', err.message || err);
    return null;
  }
};
