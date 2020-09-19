import { expect } from "chai";

describe("Happy Day", () => {
  it("should be ok", () => {
    expect(Date.now()).to.be.greaterThan(0);
  });
});
