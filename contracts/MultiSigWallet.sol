// SPDX-License-Identifier: MIT

pragma solidity 0.8.11;

import "./Modifiers.sol";

contract MultiSigWallet is Modifiers{
    
    // init the contract
    constructor(address[] memory _owners, uint256 _confirmationsRequired) 
    {   
        require(_owners.length > 0, "No owners");
        require(_confirmationsRequired > 0 && _confirmationsRequired < _owners.length, "invalide confirmtaions number");

        confirmationsRequired = _confirmationsRequired;

        address owner;

        for(uint256 i = 0; i < _owners.length; i++){   
            require(_owners[i] != address(0), "Address null");

            owner = _owners[i];
            owners.push(owner);

            require(checkOwners[owners[i]] == false, 'Must be uniq owners');
            checkOwners[owners[i]] = true;
        }
    }

    function getId() external view returns(uint256)
    {
        return address(this).balance;
    }
   
    // default methods to receive tokens into contract
    fallback() external payable{}
    receive() external payable{}

    ///@dev submits tx for execution 
    ///@param recipient the address that will receive the tx
    ///@param value tokens amount to send
    ///@param data info to send into tx
    function submit(
        address recipient, 
        uint256 value, 
        bytes calldata data
    ) 
        external 
        isTheOwner(msg.sender) 
        returns(bool)
    {   
        require(address(this).balance > value, "Not enough tokens to extract");
        Transaction memory _tx = Transaction(recipient, value, data, false, 0);
        allTransactions.push(_tx);

        initiator = msg.sender;

        return true;
    }

    // approve tx to be executed
    function approve(
        uint txId
    ) 
        external 
        isTheOwner(msg.sender) 
        txExecutedOnce(txId) 
        txExists(txId) 
        txNotConfirmed(txId)
        returns(bool)
    {   
        allTransactions[txId].numberOfConfirmations += 1;
        transactionApprovals[txId][msg.sender] = true;

        return true; 
    }

    // execute transaction
    function execute(
        uint txId
    )
        external
        isTheOwner(msg.sender)
        txExecutedOnce(txId) 
        txExists(txId) 
        returns(bool)
    {
        Transaction memory _tx = allTransactions[txId];

        require(_tx.numberOfConfirmations >= confirmationsRequired, "Not enough confirmations");
    
        _tx.executed = true;

        (bool succes, ) = _tx.recipient.call{value: _tx.value}(_tx.data);

        require(succes, "Transaction reverted -custom-");

        return true;
    }

    // revoke the confirmation
    function revokeApproval(
        uint256 txId
    ) 
        external
        isTheOwner(msg.sender)
        txExecutedOnce(txId)
        txExists(txId) 
        returns(bool)
    {
        Transaction memory _tx = allTransactions[txId];

        require(transactionApprovals[txId][msg.sender] == true, "tx not approved");

        _tx.numberOfConfirmations -= 1;

        transactionApprovals[txId][msg.sender] = false;

        return true;
    }

    // revoke the transaction
    function revokeTx(
        uint256 txId
    ) 
        external
        isTheOwner(msg.sender)
        txExecutedOnce(txId)
        txExists(txId)
        returns(bool)
    {
        require(txId == allTransactions.length - 1, "tx must be the last one");
        require(msg.sender == initiator, "the initiator can revoke submision");

        delete allTransactions[allTransactions.length - 1];

        for(uint256 i = 0; i < owners.length; i++){
            transactionApprovals[txId][owners[i]] = false;
        }

        return true;
    }
}