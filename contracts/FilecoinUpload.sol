//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract FilecoinUpload {
    struct File {
        address owner;
        string tokenURI;
    }

    File[] public fileCollection;

    event NewFile(address sender, string tokenURI);

    function storeFile(string memory ipfsURI) public {
        require(bytes(ipfsURI).length > 0);

        console.log("Your token url", ipfsURI);

        File memory newNFT = File({owner: msg.sender, tokenURI: ipfsURI});

        fileCollection.push(newNFT);

       emit NewFile(msg.sender, ipfsURI);
    }

    /**
     * @notice helper function to display NFTs for frontends
     */
    function getAllFles() public view returns (File[] memory) {
        return fileCollection;
    }
}
