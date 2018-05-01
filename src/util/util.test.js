const util = require("./util");

it('returns the correct cifty for a given Lat/Long', ()=> {
  it('returns correctly for Charlotte', () => {
    const market = util.getMarketFromLatLong({
      latitude:'35.2248813',
      longitude:'-80.8474005',
    });

    market.name.shouldBe('Charlotte');
    market.id.shouldBe(60);
  });
});