const { ethers } = require("ethers");

// scripts/index.js
async function main () {
    const address = '0x3D600f063657421Cf08AEe6fD9F64FCfc05db4b7';
    const Box = await ethers.getContractFactory('MultiSigWallet');
    const box = await Box.attach(address);

    const value = await box.submit("0x6EFbCd4f9D1ec8E1BEF2FE4FFd0FEF3Cd29f2aAA", (0.001 * (10 ** 18)), {});
    console.log(value);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });