
const { ethers } = require("ethers");

async function main()
{
    //contract address
    const contractAddress = "0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0";
    
    // human readable abi
    const contractAbi = [
        "function submit(address recipient, uint256 value, bytes calldata data)",
        "function approve(uint txId)",
        "function execute(uint txId)",
        "function revokeApproval(uint txId)"
    ]

    const SECRET_KEY = process.env.SECRET_KEY_LOCAL;

    let provider = new ethers.providers.JsonRpcProvider();
    const signer = new ethers.Wallet(SECRET_KEY, provider);
    const account = signer.connect(provider);

    const contract = new ethers.Contract(contractAddress, contractAbi, provider);
    
    const addressTo = "0xdd2fd4581271e230360230f9337d5c0430bf44c0";

    const operation1 = await contract.submit(addressTo, 1, "0x0");
    //const operation2 = await contract.execute(0);
    console.log(operation1);
}


main()
.then(() => process.exit(0))
.catch(() => process.exit(1));

