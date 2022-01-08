const { ethers } = require("ethers");
const utils = require("ethers").utils;

// scripts/index.js
async function main () {
    const address = "0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0";

    const SECRET_KEY = process.env.SECRET_KEY_LOCAL;

    let provider = new ethers.providers.JsonRpcProvider()
    //connects to the choosen framework in command line
    //console.log(provider);

    tx = {
      to: address,
      value: utils.parseEther("3.0")
    }

    const signer = new ethers.Wallet(SECRET_KEY, provider);
    await signer.signTransaction(tx);

    const Signer = signer.connect(provider);

    const confirmation = await Signer.sendTransaction(tx);
    console.log(confirmation);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });