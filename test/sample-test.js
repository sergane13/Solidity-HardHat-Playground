const { expect } = require("chai");
const { ethers } = require("hardhat");

const utils = require("ethers").utils;

describe("MultiSigWallet", function () {
  
  this.beforeAll(async function ()
  {
    Contract = await ethers.getContractFactory("MultiSigWallet");         
    contract = await Contract.deploy(["0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", "0x70997970c51812dc3a010c7d01b50e0d17dc79c8"], 1);              
    await contract.deployed(); 
  })

  // check if tx has been reverted
  it("Shall revert the transaction", async function () {
    expect(contract.submit(
      "0xdd2fd4581271e230360230f9337d5c0430bf44c0",
      3,
      '0x00'
    )).to.be.revertedWith('Not enough tokens to extract');            

  });


  it("Shall fund the contract", async () => 
  {
    const provider = new ethers.providers.JsonRpcProvider()
    const SECRET_KEY = process.env.SECRET_KEY_LOCAL;

    tx = {
      to: contract.address,
      value: utils.parseEther("3.0")
    }

    const signer = new ethers.Wallet(SECRET_KEY, provider);

    await signer.sendTransaction(tx);
  
    let num = ethers.BigNumber.from(3);
    expect(await provider.getBalance(contract.address) / (10 ** 18)).to.equal(num)
  })


  it("Shall aprove the tx", async () => 
  {
    const provider = new ethers.providers.JsonRpcProvider()
    const SECRET_KEY = process.env.SECRET_KEY_LOCAL;

    tx = {
      to: contract.address,
      value: utils.parseEther("3.0")
    }

    const wallet = new ethers.Wallet(SECRET_KEY, provider);

    await wallet.sendTransaction(tx)
    
    const submitingTx = await contract.callStatic.submit(
      "0xdd2fd4581271e230360230f9337d5c0430bf44c0",
      2,
      '0x00')

    expect(submitingTx).to.equal(true)
  })


  
});
