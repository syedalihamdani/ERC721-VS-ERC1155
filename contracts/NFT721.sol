 // SPDX-License-Identifier: MIT
 pragma solidity ^0.8.1;
 import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
 import "@openzeppelin/contracts/access/AccessControl.sol";

 contract NFT721 is ERC721,AccessControl{
     using Strings for uint256;

     string private _uri;
     uint private mintingStartId=1000000;

     


     constructor()ERC721("NFT721 CONTRACT","NFT721"){
         _uri="https://fvyrwrmtiskm.usemoralis.com/";

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
          require(hasRole(DEFAULT_ADMIN_ROLE,msg.sender),"NFT721:Caller is not Default admin");
         _uri=_newUri;
     }

        function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString(),".json")) : "";
    }

    function mintNFT(address _to,uint _amount) external {
        require(1000010>=(mintingStartId+_amount),"NFT721:amount exceed minting limit");
        require(hasRole(DEFAULT_ADMIN_ROLE,msg.sender),"NFT721:Only admin has right to mint the token");
        for (uint i=0; i<_amount;i++){
             mintingStartId +=1;
            _safeMint(_to,mintingStartId);
        }

    }






 }