 // SPDX-License-Identifier: MIT
 pragma solidity ^0.8.1;
 import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
 import "@openzeppelin/contracts/access/AccessControl.sol";

 contract NFT721 is ERC721,AccessControl{
     using Strings for uint256;

     string private _uri;

     bytes32 public constant minterRole=keccak256("MINTER_ROLE");


     constructor()ERC721("NFT721 CONTRACT","NFT721"){
         _uri="www.me.com";

         _setupRole(DEFAULT_ADMIN_ROLE,msg.sender);
     }

    /** 
    * @dev Creates a standard method to publish and detect what interfaces a smart contract implements.In case if we get more interfaces
    * then  we have to override supportInterface function and add the interfaces name into the override tupple.like function function down
    */

     function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

     function _baseURI() internal view virtual override returns(string memory) {
        return _uri;
     }

     function getBaseUri() external view returns(string memory){
         return _uri;
     }

      function setBaseUri(string memory _newUri) external{
         _uri=_newUri;
     }



  


 }