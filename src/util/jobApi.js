/* eslint-disable import/prefer-default-export */

import fetch from 'isomorphic-fetch';

export const loadJobs = async (
  marketId,
  options = {},
) => {
  const {
    majorSegment,
    minorSegment,
    limit,
    page,
  } = options;

  let marketQuery = '';
  if (marketId) marketQuery = `%20+AquentJob.locationId:${marketId}`;

  let minorSegmentQuery = '';
  if (minorSegment) minorSegmentQuery = `%20+AquentJob.minorSpecialty1:${minorSegment}`;

  let limitQuery = '';
  if (limit) limitQuery = `/limit/${limit}`;

  let pageQuery = '';
  if (page) pageQuery = `/offset/${page}`;

  const urlBase = 'https://aquent.com/api/content/render/false/type/json/query/+contentType:AquentJob%20+AquentJob.isPosted:true%20+languageId:1%20+deleted:false%20+working:true';
  const urlPageLimitSuffix = `/orderby/AquentJob.postedDate%20desc${limitQuery}${pageQuery}`;

  // attempt 1: include everything.  Market, major/minor segment
  let apiUrl = `${urlBase}${marketQuery}${minorSegmentQuery}${urlPageLimitSuffix}`;
  let jobs = await jobsApiCall(apiUrl);

  if (jobs.length <= 0) {
    if (minorSegmentQuery.length > 0) {
      // we got no jobs when we provided everything, let's try without minor segment
      apiUrl = `${urlBase}${marketQuery}${urlPageLimitSuffix}`;
      jobs = await jobsApiCall(apiUrl);

      if (jobs.length <= 0) {
        // we got no jobs for this market at all, so let's try _any jobs_ for this minor segment
        apiUrl = `${urlBase}${minorSegmentQuery}${urlPageLimitSuffix}`;
        jobs = await jobsApiCall(apiUrl);
      }

      if (jobs.length <= 0) {
        // we got no jobs for this minor segment, and no jobs for this specific market, so let's
        // query for _any jobs anywhere_ and return that.
        apiUrl = `${urlBase}${urlPageLimitSuffix}`;
        jobs = await jobsApiCall(apiUrl);
      }
    } else {
      // we got no jobs on the first try (with just market), but were never provided a minor segment
      // to begin with.  We will query for _any jobs anywhere_ and return that.
      apiUrl = `${urlBase}${urlPageLimitSuffix}`;
      jobs = await jobsApiCall(apiUrl);
    }
  }

  return jobs;
};


const jobsApiCall = async (queryUrl) => {
  try {
    const response = await fetch(
      queryUrl,
      {
        contentType: 'application/json',
        dataType: 'jsonp',
      },
    );
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
