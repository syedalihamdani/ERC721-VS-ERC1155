  // SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";


contract NFT1155 is ERC1155,AccessControl{

constructor() ERC1155("www.dummy.com/"){
    _setupRole(DEFAULT_ADMIN_ROLE,msg.sender);
}

function setUri(string memory _uri) external {
    _setURI(_uri);
}

 function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155,AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function mint(address _to,uint _id,uint _amount)external {
        _mint(_to,_id,_amount,"");
    }

    function uri(uint256 tokenId) public view virtual override returns (string memory) {
        string memory baseUri=super.uri(1);
        return(string(abi.encodePacked(baseUri,Strings.toString(tokenId),".json")));
    }



}