const { ethers } = require("ethers");
const utils = require("ethers").utils;

// scripts/index.js
async function main () {
    const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

    const SECRET_KEY = process.env.SECRET_KEY_LOCAL;

    let provider = new ethers.providers.JsonRpcProvider()
    //connects to the choosen framework in command line
    //console.log(provider);

    tx = {
      to: address,
      value: utils.parseEther("3.0")
    }

    const signer = new ethers.Wallet(SECRET_KEY, provider);
    //await signer.signTransaction(tx);

    //const Signer = signer.connect(provider);

    //const confirmation = await signer.sendTransaction(tx);
    //console.log(confirmation);

    console.log(await provider.getBalance(address))
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });