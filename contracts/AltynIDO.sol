// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transfer(address _to, uint256 _value) external returns (bool);
}

contract AltynIDO {
    address private admin;
    address public contractAltyn;
    uint256 public rate;

    constructor(address _contractAltyn) public {
      admin = msg.sender;
      rate = 4000;
      contractAltyn = _contractAltyn;
    }

    function setRate(uint256 _rate) public {
      require(msg.sender == admin);
      //rate = _rate; // how many ETH for 1 ALTYN
      rate = _rate; // how many ALTYN for 1 ETH
    }

    function getRate() public view returns (uint256) {
      return rate;
    }

    function preSale() external payable {
      require(msg.value != 0);
      IERC20 altyn = IERC20(contractAltyn);
      altyn.transfer(msg.sender, msg.value * rate);// (rate * (10 ** 18)) / (10 ** 18));
    }

    function withdraw() external {
      require(msg.sender == admin);
      require(address(this).balance > 0);
      payable(admin).transfer(address(this).balance);
    }
}
