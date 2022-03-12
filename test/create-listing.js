const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ManageListing", function () {
  it("Create a new listing", async function () {
    const ManageListing = await ethers.getContractFactory("ManageListing");
    const manage = await ManageListing.deploy();
    await manage.deployed();
    var result = await manage.getAllListings();

    expect(result).to.have.lengthOf(0);

    await manage.createListing(
        1,
        4,
        "Irvington",
        "Welcome",
        "https://bingbong",
        "65000",
        231,
        "NJ",
        "18 Wallo",
        "07111"
    );

    const newResults = await manage.getAllListings();

    expect(newResults).to.have.lengthOf(1);
    expect(newResults[0].city).to.equal("Irvington");


    // Test that a listing is not found
    await expect(manage.getListing(1)).to.be.revertedWith('Not found');


    // Test when a listing is found
    const foundListing = await manage.getListing(0);
    expect(foundListing.city).to.equal('Irvington');
  });
});
