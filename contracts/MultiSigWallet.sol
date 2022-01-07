// SPDX-License-Identifier: MIT

pragma solidity 0.8.11;

contract MultiSigWallet
{
    // array with owners of the wallet
    address[] private owners; 

    // store in a mapping with the value bools, if an address is an owner
    mapping(address => bool) private checkOwners;

    // struct of transaction
    struct Transaction
    {
        address recipient;
        uint256 value;
        bytes data;
        bool executed;
        uint256 numberOfConfirmations;
    }

    uint256 private confirmationsRequired;

    // index of transaction
    uint256 private transactionIndex = 0;

    // array with all transactions done by this contract    
    Transaction[] private allTransactions;
    
    /*
        mapping to know who approved or not a transaction
        uint -> transaction index
        address -> address of the owner
        bool -> if it has been approved by the owner
    */
    mapping(uint256 => mapping(address => bool)) private transactionApprovals;


    /*
        ### Modifiers ###
    */

    modifier isTheOwner(address sender)
    {
        require(checkOwners[sender], "Not the owner");
        _;
    }

    modifier txExecutedOnce(uint256 txId)
    {
        require(!allTransactions[txId].executed, "tx already executed");
        _;
    }

    modifier txExists(uint256 txId)
    {
        require(txId < transactionIndex, "tx does not exists");
        _;
    }

    modifier txNotConfirmed(uint256 txId)
    {
        require(!transactionApprovals[txId][msg.sender], "tx already confirmed");
        _;
    }
    

    // init the contract
    constructor(address[] memory _owners, uint256 _confirmationsRequired) 
    {   
        require(_owners.length > 0, "No owners");
        require(_confirmationsRequired > 0 && _confirmationsRequired < _owners.length, "invalide confirmtaions number");

        confirmationsRequired = _confirmationsRequired;

        address owner;

        for(uint256 i = 0; i < _owners.length; i++)
        {   
            require(_owners[i] != address(0), "Address null");

            owner = _owners[i];
            owners.push(owner);

            require(checkOwners[owners[i]] == false, 'Must be uniq owners');
            checkOwners[owners[i]] = true;
        }
    }

    
    // get the owners of the contract
    function getOwners() external view returns(address[] memory)
    {
        return owners;
    }


    // default methods to receive tokens into contract
    fallback() external payable{}
    receive() external payable{}


    // submit transaction to be executed
    function submit(
        address recipient, 
        uint256 value, 
        bytes calldata data) 
        external 
        isTheOwner(msg.sender) 
    {
        Transaction memory _tx = Transaction(recipient, value, data, false, 0);
        allTransactions.push(_tx);

        transactionIndex += 1;
    }


    // approve tx to be executed
    function approve(
        uint txId) 
        external 
        isTheOwner(msg.sender) 
        txExecutedOnce(txId) 
        txExists(txId) 
        txNotConfirmed(txId)
    {   
        allTransactions[txId].numberOfConfirmations += 1;
        transactionApprovals[txId][msg.sender] = true;
    }


    // execute transaction
    function execute(
        uint txId)
        external
        isTheOwner(msg.sender)
        txExecutedOnce(txId) 
        txExists(txId) 
    {
        uint256 confirmationNumber = 0 ;

        for(uint256 i = 0; i < owners.length; i++)
        {
            if(transactionApprovals[txId][owners[i]])
            {
                confirmationNumber += 1;
            }
        }

        require();
    }

    
    // Execute transaction execute transaction if mimum requirments are done
    // Revoke approvement from a transaction 
    // Revoke transaction from execution
}
