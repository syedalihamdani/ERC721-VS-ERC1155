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

  })


  it("NFT721:getBaseURI", async function () {
    let getBaseUri=await this.deploedNFT721.getBaseUri();
    expect(getBaseUri).to.equal("www.me.com");
  });

  it("AccessControl:hasRole", async function () {
    let Default_admin_role=await this.deploedNFT721.DEFAULT_ADMIN_ROLE();
    let hasRole=await this.deploedNFT721.hasRole(Default_admin_role,this.account1.address);
    expect(hasRole).to.equal(true);
  });

  it("AccessControl:getRoleAdmin", async function () {
    let Default_admin_role=await this.deploedNFT721.DEFAULT_ADMIN_ROLE();
    let getRoleAdmin=await this.deploedNFT721.getRoleAdmin(Default_admin_role);
    // console.log(getRoleAdmin);
    expect(Default_admin_role).to.equal(getRoleAdmin);
  });

  it("AccessControl:grantRole case_1,Only Default_admin can call grantRole function", async function () {
    let minterRole=await this.deploedNFT721.minterRole();
    await this.deploedNFT721.grantRole(minterRole,this.account2.address)
    let hasRole=await this.deploedNFT721.hasRole(minterRole,this.account2.address);
    expect(hasRole).to.equal(true);
  });
  

  it("NFT721:setBaseURI", async function () {
    await this.deploedNFT721.setBaseUri("www.new.com")
    let getBaseUri=await this.deploedNFT721.getBaseUri();
    expect(getBaseUri).to.equal("www.new.com");
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
