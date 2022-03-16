// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Altyn is ERC20 {

    address private admin;
    address private preSaleContract;

//  constructor(uint256 initialSupply) ERC20("Simple_Token", "ST") {
//      _mint(msg.sender, initialSupply);
    constructor() ERC20("Altyn Coin", "ALTYN") {
        _mint(msg.sender, 1000000 * (10 ** uint256(decimals()))); //все токены передать создателю контракта
        admin = msg.sender;
    }

    function decimals() public pure override returns (uint8) {
        return 18;
    }

    function getPreSaleContract() public view returns (address) {
      return preSaleContract;
    }

    function setPreSaleContract(address _preSaleContract) public {
      require(msg.sender == admin);
      preSaleContract = _preSaleContract;
      _mint(preSaleContract, 1000000 * (10 ** uint256(decimals())));
    }

}
