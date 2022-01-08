async function main() {
  const multiSigWallet = await ethers.getContractFactory("MultiSigWallet")

  // Start deployment, returning a promise that resolves to a contract object
  const contract = await multiSigWallet.deploy(["0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", "0x70997970c51812dc3a010c7d01b50e0d17dc79c8"], 1);
  //const contract = await multiSigWallet.deploy(120);
  console.log(contract.abi);
  console.log("Contract deployed to address:", contract.address)
}


// this is a promise
main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error)
      process.exit(1)
  })
