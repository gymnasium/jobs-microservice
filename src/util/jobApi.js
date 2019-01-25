/* eslint-disable import/prefer-default-export */

import fetch from 'isomorphic-fetch';

export const loadJobs = (
  marketId,
  options = {},
) => new Promise((res /* , reject */) => {
  const {
    majorSegment,
    minorSegment,
    limit,
    page,
  } = options;

  let minorSegmentQuery = '';
  if (minorSegment) minorSegmentQuery = `%20+AquentJob.minorSpecialty1:${minorSegment}`;

  let limitQuery = '';
  if (limit) limitQuery = `/limit/${limit}`;

  let pageQuery = '';
  if (page) pageQuery = `/offset/${page}`;

  const apiUrl = `https://aquent.com/api/content/render/false/type/json/query/+contentType:AquentJob%20+AquentJob.isPosted:true%20+languageId:1%20+deleted:false%20+working:true%20+AquentJob.locationId:${marketId}${minorSegmentQuery}/orderby/AquentJob.postedDate%20desc${limitQuery}${pageQuery}`;

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
