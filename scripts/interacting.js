const { ethers } = require("ethers");

// scripts/index.js
async function main () {
    const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const myAddress = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";
    //const Contract = await ethers.getContractFactory('MultiSigWallet');
    //const contract = await Contract.attach(address);

    // let recipientAddress = "0x70997970c51812dc3a010c7d01b50e0d17dc79c8";
    // let value = 10 ^ 14;
    // let data = "0x00";

    const SECRET_KEY = process.env.SECRET_KEY_LOCAL;

    let provider = ethers.getDefaultProvider(); //connects to the choosen framework in command line
    console.log(provider);

    //const signer = new ethers.Wallet(SECRET_KEY, provider);
    //const Signer = signer.connect(provider);

    //let abiCode = hre.artifacts.readArtifact("Bar");

    //const randomWallet = new ethers.Wallet.createRandom();
    //console.log(randomWallet.address);

    // const tx = 
    // {
    //   from: address,
    //   to: myAddress,
    //   value: 100,
    //   data: "0x0"
    // }

    // const msgBack = Signer.sendTransaction(tx);
    // console.log(msgBack);

    //const msgBack = await provider.getBalance(address);
    //const msgBack = await contract.submit(recipientAddress, value, data);
    //const msgBack = await contract.approve(0);
    //const msgBack = await contract.execute(0);
    //console.log(msgBack);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });