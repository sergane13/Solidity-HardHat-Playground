
const { ethers } = require("ethers");

async function main()
{   
    //contract address
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    
    // human readable abi
    const contractAbi = [
        "function getId() view returns(uint256)",
        "function submit(address recipient, uint256 value, bytes calldata data)",
        "function approve(uint txId)",
        "function execute(uint txId)",
        "function revokeApproval(uint txId)"
    ]

   
    let provider = new ethers.providers.JsonRpcProvider();
    signer = provider.getSigner(0)

    const contract = new ethers.Contract(contractAddress, contractAbi, signer);

    //console.log(contract)
    const operation1 = await contract.getId();
    console.log(operation1)
    //console.log(await provider.getCode("0x5FbDB2315678afecb367f032d93F642f64180aa3"))
    //console.log(await provider.getTransactionCount("0x5FbDB2315678afecb367f032d93F642f64180aa3"))
}


main()
.then(() => 
{
    process.exit(0)
})
.catch((err) => 
{
    console.log(err)
    process.exit(1)
});

