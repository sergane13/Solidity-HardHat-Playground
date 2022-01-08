const { cons } = require("fp-ts/lib/NonEmptyArray2v");
const { task } = require("hardhat/config");
const { int } = require("hardhat/internal/core/params/argumentTypes");
const { string } = require("yargs");

require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("balance1", "get the balance of address 1", async(taskArgs, hre) => 
{
  const accounts = await hre.ethers.getSigners();

  console.log(accounts[0].networks);
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const SECRET_KEY = process.env.SECRET_KEY_LOCAL;

module.exports = {
  solidity: "0.8.11",
  networks:
  {
    rinkeby:
    {
      url: "https://rinkeby.infura.io/v3/3e7a4ea8738f4a3d9810ee95db1ab23f",
      accounts: [SECRET_KEY],
    },
    polygon:
    {
      url: "https://polygon-mumbai.infura.io/v3/cf9c3560598d4eac8eabb0d7b278ff49",
      accounts: [SECRET_KEY]
    }    
  }
};
