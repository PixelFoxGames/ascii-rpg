import { expect } from "chai";

describe("Happy Day", () => {
  it("should be ok", (done) => {
    expect(Date.now()).to.be.greaterThan(0);
    done();
  });
});
