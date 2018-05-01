import _ from 'lodash';
import LatLon from 'geodesy/latlon-vectors';

import { MARKETS } from './constants';
import { loadJobsForMarket } from './jobApi';

/**
 * Get locale nearest to the input position.
 * @param {*} position - object containing lat and long for which we will retun the nearest locale
 * @returns object representing the market nearest to the lat/long pair
 */
export const getMarketFromLatLong = (position) => {
  let nearestDist = Infinity;
  let nearestMarket = null;

  const p1 = new LatLon(position.latitude, position.longitude);

  _.forEach(MARKETS, (market) => {
    const p2 = new LatLon(market.coords.latitude, market.coords.longitude);
    const dist = p1.distanceTo(p2);
    if (dist < nearestDist) {
      nearestDist = dist;
      nearestMarket = market;
    }
  });

  return nearestMarket;
};

/**
 * Returns a market, given its id. Returns undefined if id is not found.
 * @param {*} marketId the ID to search for.
 */
export const getMarketFromId = (marketId) => {
  if (!marketId) return undefined;

  return MARKETS[marketId];
};

export const fetchJobsForMarket = async (marketId, minorSegments = []) => {
  // make sure a marketId was supplied
  if (!marketId) return null;

  // make sure the input market is one that we know about
  if (!MARKETS[marketId]) return null;

  // go call the API for that market
  try {
    return await loadJobsForMarket(marketId, minorSegments);
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const generateUTMSlug = (
  utmCampaign = 'job-module',
  utmSource = 'thegymnasium.com',
  utmMedium = 'web',
) => {
  const UTMSlug = `utm_source=${utmSource}&utm_medium=${utmMedium}&utm_campaign=${utmCampaign}`;
  return UTMSlug;
};

