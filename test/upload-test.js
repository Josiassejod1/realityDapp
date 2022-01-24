const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FilecoinUpload", function () {
  it("Should return a new file", async function () {
    const owner = ethers.getSigners();
    const File = await ethers.getContractFactory("FilecoinUpload");
    const file = await File.deploy();
    await file.deployed();
    var result = await file.getAllFles();

    expect(result).to.have.lengthOf(0);

    const url = "https://www.test.com";
    file.storeFile(url);
    result = await file.getAllFles();

    expect(result).to.have.lengthOf(1);
    expect(result[0][0]).to.equal("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
    expect(result[0][1]).to.equal(url);
  });
});
