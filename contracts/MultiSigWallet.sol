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

    // index of transaction
    uint256 private transactionIndex;

    // array with all transactions done by this contract    
    Transaction[] private allTransactions;
    
    /*
        mapping to know who approved or not a transaction
        uint -> transaction index
        address -> address of the owner
        bool -> if it has been approved by the owner
    */
    mapping(uint256 => mapping(address => bool)) private transactionApprovals;


    constructor(address[] memory _owners) 
    {   
        
    }


    // constructor assign the owners of the contract addresses
    // mapping to store owners of the contract as bool
    // mimum required votes

    // onlyOwners can submit verifications of

    // mapping with txid => address => bool to check if the transaction members approved 
    // Array of transactions done
    // transaction index
 
    // Submit transaction to be approved
    // Aprove transaction existend
    // Execute transaction execute transaction if mimum requirments are done
    // Revoke approvement from a transaction 
    // Revoke transaction from execution
}
