//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Test
{
    uint256 public firstNumber = 0;
    uint256 public secondnumber = 0;


    constructor(uint256 _firstNumber, uint256 _secondNumber)
    {
        firstNumber = _firstNumber;
        secondnumber = _secondNumber;
    }

    function getOne() public view returns(uint256)
    {
        return firstNumber;
    }

    function getTwo() public view returns(uint256)
    {
        return secondnumber;
    }
}