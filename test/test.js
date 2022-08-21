const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Contract", function () {
  it("Should mint an NFT", async function () {
    const accounts = await hre.ethers.getSigners();
    const Contract = await ethers.getContractFactory("Contract");
    const contract = await Contract.deploy();
    await contract.deployed();

    await contract.mint(0,2, {
      value: ethers.utils.parseEther("0.02")
    })

    // console.log(accounts);
    const balanceOfMinter = await contract.balanceOf( accounts[0].address, 0);
    expect(balanceOfMinter).to.equal(2);
  });
});
