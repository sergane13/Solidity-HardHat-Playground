
// scripts/index.js
async function main () {
    const address = '0x53Ab75b5Ba35857D0b9B8B5980D57A4507EB9605';
    const Box = await ethers.getContractFactory('MultiSigWallet');
    const box = await Box.attach(address);

    const value = await box.getOwners();
    console.log(value);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });