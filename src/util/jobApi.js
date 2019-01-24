/* eslint-disable import/prefer-default-export */

import fetch from 'isomorphic-fetch';

const DEFAULT_MINOR_SEGMENT = 96;
const DEFAULT_MAJOR_SEGMENT = 100;

export const loadJobsForMarket = (
  marketId,
  options = {},
) => new Promise((res /* , reject */) => {
  const {
    majorSegment,
    minorSegment,
    limit,
    page,
  } = options;

  const minorSegmentQuery = `%20+AquentJob.minorSpecialty1:${minorSegment || DEFAULT_MINOR_SEGMENT}`;
  const apiUrl = `https://aquent.com/api/content/render/false/type/json/query/+contentType:AquentJob%20+AquentJob.isPosted:true%20+languageId:1%20+deleted:false%20+working:true%20+AquentJob.locationId:${marketId}${minorSegmentQuery}/orderby/AquentJob.postedDate%20desc/limit/${limit}/offset/${page}`;

  fetch(
    apiUrl,
    {
      contentType: 'application/json',
      dataType: 'jsonp',
    },
  ).then((response) => {
    if (response.status <= 200) {
      return response.text();
    }
    console.error('an error has occurred.');
    return null;
  }).then((body) => {
    const jobs = JSON.parse(body).contentlets;
    res(jobs);
  });
});
