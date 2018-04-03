const util = require("./util");
const { MARKETS } = require("./constants");

const charlottePosition = MARKETS[61].coords;
const nycPosition = MARKETS[11].coords;
const malformattedPoint = {
  // this point is intentionally missing longitude!
  latitude: 0
};
const distanceBetweenCharlotteAndNYC = 8.76584188623118;

test("distance between Charlotte and NYC should be calculated accurately", () => {
  expect(util.distanceBetweenPoints(charlottePosition, nycPosition)).toBe(
    distanceBetweenCharlotteAndNYC
  );
});

test("should return 0 if points are the same", () => {
  expect(util.distanceBetweenPoints(charlottePosition, charlottePosition)).toBe(
    0
  );
});

test("should return an exception if only one point is provided", () => {
  expect(() => {
    util.distanceBetweenPoints(charlottePosition).toThrow();
  });
  expect(() => {
    util.distanceBetweenPoints(null, charlottePosition).toThrow();
  });
});

test("both input coordinates must have lat and long provided", () => {
  expect(() => {
    util.distanceBetweenPoints(charlottePosition, malformattedPoint).toThrow();
  });
  expect(() => {
    util.distanceBetweenPoints(malformattedPoint, charlottePosition).toThrow();
  });
  expect(() => {
    util.distanceBetweenPoints(malformattedPoint, malformattedPoint).toThrow();
  });
});

/* other tests I might write for distanceBetweenPoints() */
/*
  - make sure lat and long are numeric 
  - make sure lat and long are valid latitudes and longitudes
  - make sure distance is calculated correctly across negative and positive lat/long
*/
