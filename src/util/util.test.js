const util = require('./util');

it('returns the correct cifty for a given Lat/Long', () => {
  // for charlotte
  const market = util.getMarketFromLatLong({
    latitude: '35.2248813',
    longitude: '-80.8474005',
  });

  expect(market.name).toEqual('Charlotte');
  expect(market.id).toEqual(61);
});
