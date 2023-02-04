const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Contract", function () {
  it("Should mint an NFT", async function () {
    const accounts = await hre.ethers.getSigners();
    const Contract = await ethers.getContractFactory("Web3NFT");
    const contract = await Contract.deploy();
    await contract.deployed();

    await contract.mint(0, 2, {
      value: ethers.utils.parseEther("0.02"),
    });

    // console.log(accounts);
    const balanceOfMinter = await contract.balanceOf(accounts[0].address, 0);
    expect(balanceOfMinter).to.equal(2);
  });
  it("Successful example of reentrancy erc1155", async () => {
    const [deployer] = await ethers.getSigners();
    const Contract = await ethers.getContractFactory("Web3NFT");
    const contract = await Contract.deploy();
    await contract.deployed();
    const Attacker = await hre.ethers.getContractFactory("Attacker");
    const attacker = await Attacker.deploy(contract.address, deployer.address);

    await attacker.deployed();

    const balance = await contract.balanceOf(deployer.address, 1);
    console.log("balance ", balance.toString());
    expect(balance.toString()).equal("130");
  });
});
