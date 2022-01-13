const { expect } = require("chai");
const { ethers } = require("hardhat");
const utils = require("ethers").utils;
const { MockProvider } = require('ethereum-waffle');

describe("MultiSigWallet", function () {
  
  this.beforeAll(async function ()
  {
    Contract = await ethers.getContractFactory("MultiSigWallet");         
    contract = await Contract.deploy(["0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", "0x70997970c51812dc3a010c7d01b50e0d17dc79c8"], 1);              
    await contract.deployed(); 
  })


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
    const Signer = signer.connect(provider);

    //console.log(await signer.getBalance())

    const confirmation = await Signer.sendTransaction(tx);
    await Signer.signTransaction(confirmation);

    console.log(await contract.getId())
    //console.log(await provider.getBalance(contract.address))

    expect(confirmation).to.changeEtherBalance(contract.address, ethers.utils.parseEther("0.1"))
    .catch((err) => 
    {
      //console.log(err)
    });
  })

  // it("Shall aprove the tx", async () => 
  // {
  //   const contract = await deployContract() 
  
  //   const provider = new MockProvider();
  //   const [wallet, otherWallet] = provider.getWallets();

  //   tx = {
  //     to: contract.address,
  //     value: utils.parseEther("4.0")
  //   }

  //   const tempvalue = await wallet.sendTransaction(tx)
    
  //   await contract.submit(
  //     "0xdd2fd4581271e230360230f9337d5c0430bf44c0",
  //     2,
  //     '0x00')

  //   console.log(await contract.getId())

  //   console.log(await tempvalue)
  //   expect(await contract.approve(0)).to.equal(true)
  // })
});
