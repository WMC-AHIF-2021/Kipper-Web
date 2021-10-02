import { expect } from "chai";
import { simpleExample } from "../main";

describe("Simple", () => {
  it("Example", () => {
    const r = simpleExample();
    expect(r).to.equal(r);
  });
});
