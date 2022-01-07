async function main() {
  const multiSigWallet = await ethers.getContractFactory("MultiSigWallet")

  // Start deployment, returning a promise that resolves to a contract object
  const contract = await multiSigWallet.deploy(["0x22cFDCba61311a188A238D5C3F4fd6D7bEC2EccC", "0x6EFbCd4f9D1ec8E1BEF2FE4FFd0FEF3Cd29f2aAA"], 1);
  //const contract = await multiSigWallet.deploy(120);
  console.log("Contract deployed to address:", contract.address)
}


// this is a promise
main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error)
      process.exit(1)
  })
