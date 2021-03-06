const { expect } = require("chai");
const { ethers,waffle } = require("hardhat");
const provider=waffle.provider;

describe("NFT721 VS NFT1155", function () {
  beforeEach("Deploying contract for unit testing",async function(){
    [this.account1,this.account2,this.account3,this.account4,this.account5,this.account6,this.account7,this.account8,
      this.account9,this.account10,this.account11,this.account12,this.account13,this.account14,this.account15,this.account16,
      this.account17,this.account18,this.account19,this.account20]=await ethers.getSigners();

      // *************************************************NFT721*************************************************************************
      const NFT721 = await ethers.getContractFactory("NFT721");
    this.deploedNFT721 = await NFT721.deploy();
    await this.deploedNFT721.deployed();

    this.NFT721fromAccount1=this.deploedNFT721.connect(this.account1);
    
    this.NFT721fromAccount2=this.deploedNFT721.connect(this.account2);
    
    this.NFT721fromAccount3=this.deploedNFT721.connect(this.account3);

    
      // *************************************************NFT1155*************************************************************************
      const NFT1155 = await ethers.getContractFactory("NFT1155");
    this.deploedNFT1155 = await NFT1155.deploy();
    await this.deploedNFT1155.deployed();

    this.NFT1155fromAccount1=this.deploedNFT1155.connect(this.account1);
    
    this.NFT1155fromAccount2=this.deploedNFT1155.connect(this.account2);
    
    this.NFT1155fromAccount3=this.deploedNFT1155.connect(this.account3);

  })

// ***************************************************NFT721 UNIT TESTS START********************************************************
  it("NFT721:getBaseURI", async function () {
    let getBaseUri=await this.deploedNFT721.getBaseUri();
    expect(getBaseUri).to.equal("https://fvyrwrmtiskm.usemoralis.com/");
  });

  it("AccessControl:hasRole", async function () {
    let Default_admin_role=await this.deploedNFT721.DEFAULT_ADMIN_ROLE();
    let hasRole=await this.deploedNFT721.hasRole(Default_admin_role,this.account1.address);
    expect(hasRole).to.equal(true);
  });

  it("AccessControl:getRoleAdmin", async function () {
    let Default_admin_role=await this.deploedNFT721.DEFAULT_ADMIN_ROLE();
    let getRoleAdmin=await this.deploedNFT721.getRoleAdmin(Default_admin_role);
    expect(Default_admin_role).to.equal(getRoleAdmin);
  });

  it("NFT721:setBaseURI", async function () {
    await this.deploedNFT721.setBaseUri("www.new.com")
    let getBaseUri=await this.deploedNFT721.getBaseUri();
    expect(getBaseUri).to.equal("www.new.com");
  });

  it("NFT721:setBaseURI 1st_revert condition", async function () {
    await expect(this.NFT721fromAccount2.setBaseUri("www.hello.com")).to.be.revertedWith("NFT721:Caller is not Default admin");
  });

  it("NFT721:mintNFT & tokenURI", async function () {
    await this.deploedNFT721.mintNFT(this.account2.address,10);
    let tokenURI=await this.deploedNFT721.tokenURI(1000010);
    expect(tokenURI).to.equal("https://fvyrwrmtiskm.usemoralis.com/1000010.json");
  });

  it("NFT721:mintNFT 1st_revert condition", async function () {
    await expect(this.deploedNFT721.mintNFT(this.account2.address,101)).to.be.revertedWith("NFT721:amount exceed minting limit");
  });
  it("NFT721:mintNFT 2nd_revert condition", async function () {
    await expect(this.NFT721fromAccount3.mintNFT(this.account2.address,1)).to.be.revertedWith("NFT721:Only admin has right to mint the token");
  });

  // ***************************************************NFT721 UNIT TESTS COMPLETED********************************************************

  



// ***************************************************NFT1155 UNIT TESTS START********************************************************
it("NFT1155:setURI", async function () {
  await this.deploedNFT1155.setUri("www.new.com/")
  let uri=await this.deploedNFT1155.uri(1);
  expect(uri).to.equal("www.new.com/1.json");
});


it("NFT1155:URI", async function () {
  let uri=await this.deploedNFT1155.uri(1);
  expect(uri).to.equal("https://fvyrwrmtiskm.usemoralis.com/1.json");
});


it("NFT1155mintNFT", async function () {
  await this.deploedNFT1155.mint(this.account2.address,1,2);
  let balanceOf=await this.deploedNFT1155.balanceOf(this.account2.address,1);
  expect(balanceOf).to.equal(2);
});

it("NFT1155:mint 1st_revert condition", async function () {
  await expect(this.deploedNFT1155.mint(this.account2.address,11,5)).to.be.revertedWith("NFT1155:id exceed minting limit");
});
it("NFT1155:mintNFT 2nd_revert condition", async function () {
  await expect(this.NFT1155fromAccount3.mint(this.account2.address,1,6)).to.be.revertedWith("NFT1155:Only admin has right to mint the token");
});







  // it("Should return the greeting", async function () {
  //   await expect(this.deploedGreeter.setGreeting("no")).to.be.revertedWith("Greeter: 10 minutes has not been passed")
  // });




  // it("Should return the greeting", async function () {
  //   await network.provider.send("evm_increaseTime", [600]);
  //   await this.deploedGreeter.setGreeting("no");
  //   let greet=await this.deploedGreeter.greet();
  //   expect(greet).to.equal("no");
  // });





});
