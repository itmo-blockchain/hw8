// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract HashesStorage {

    mapping(address => bytes) public filesAddresses;

    function addHash(bytes memory _digest) public {
        filesAddresses[msg.sender] = _digest;
    }

    function getHash() public view returns (bytes memory) {
        return filesAddresses[msg.sender];
    }

    function getHash(address _address) public view returns (bytes memory) {
        return filesAddresses[_address];
    }
}

