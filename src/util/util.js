import _ from 'lodash';
import LatLon from 'geodesy/latlon-spherical';

import {
  DEFAULT_MARKET,
  MARKETS,
} from './constants';
import { loadJobs } from './jobApi';

export const getMarketFromURLParams = (
  marketId,
  latitude = 35.227087, // lat for Charlotte
  longitude = -80.843127, // long for Charlotte
) => {
  // choose boston as default market, if all else fails
  let market = MARKETS[10];

  // if a marketId is provided, we use that
  if (marketId) {
    market = getMarketFromId(marketId);
  } else if (latitude && longitude) {
    // if lat/long are provided, we load a market from there
    // this will fall back to the defaults provided to this function
    market = getMarketFromLatLong({
      latitude,
      longitude,
    });
  }
  return market;
};

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
 * Returns a market, given its id. Returns the default market if id is not found.
 * @param {*} marketId the ID to search for.
 */
export const getMarketFromId = (marketId) => {
  let market = DEFAULT_MARKET;
  if (marketId in MARKETS) {
    market = MARKETS[marketId];
  }

  return market;
};

export const fetchJobs = async (marketId, options) => {
  // make sure a marketId was supplied
  if (!marketId) return null;

  // make sure the input market is one that we know about
  if (!MARKETS[marketId]) return null;

  // go call the API for that market
  try {
    return await loadJobs(marketId, options);
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
