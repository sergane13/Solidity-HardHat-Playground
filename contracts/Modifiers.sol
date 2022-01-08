// SPDX-License-Identifier: MIT

pragma solidity 0.8.11;

contract Modifiers{

    // array with owners of the wallet
    address[] public owners; 

    // the owner who initiated the tx
    address public initiator;

    // store in a mapping with the value bools, if an address is an owner
    mapping(address => bool) public checkOwners;

    // struct of transaction
    struct Transaction{
        address recipient;
        uint256 value;
        bytes data;
        bool executed;
        uint256 numberOfConfirmations;
    }

    // confirmations required for tx to pass
    uint256 public confirmationsRequired;

    // array with all transactions done by this contract    
    Transaction[] public allTransactions;
    
    /*
        mapping to know who approved or not a transaction
        uint -> transaction index
        address -> address of the owner
        bool -> if it has been approved by the owner
    */
    mapping(uint256 => mapping(address => bool)) public transactionApprovals;


    /*
        ### Modifiers ###
    */

    modifier isTheOwner(address sender){
        require(checkOwners[sender], "Not the owner");
        _;
    }

    modifier txExecutedOnce(uint256 txId){
        require(!allTransactions[txId].executed, "tx already executed");
        _;
    }

    modifier txExists(uint256 txId){
        require(txId < allTransactions.length, "tx does not exists");
        _;
    }

    modifier txNotConfirmed(uint256 txId){
        require(!transactionApprovals[txId][msg.sender], "tx already confirmed");
        _;
    }
}