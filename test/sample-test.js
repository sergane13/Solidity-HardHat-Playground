const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");         // get solidity contract
    const greeter = await Greeter.deploy("Hello, world!");              // deploy solidity contract
    await greeter.deployed();                                           // wait for contract to be deployed

    expect(await greeter.greet()).to.equal("Hello, world!");            // unit testing calling function greet from contract

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");    // call function setGreting from contract

    // wait until the transaction is mined
    await setGreetingTx.wait();                                         //

    expect(await greeter.greet()).to.equal("Hola, mundo!");             //
  });
});
