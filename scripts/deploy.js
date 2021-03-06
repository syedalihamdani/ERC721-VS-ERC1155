// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  // const NFT721 = await hre.ethers.getContractFactory("NFT721");
  // const nft721 = await NFT721.deploy();

  // await nft721.deployed();

  // console.log("NFT721 deployed to:", nft721.address);


  const NFT1155 = await hre.ethers.getContractFactory("NFT1155");
  const nft1155 = await NFT1155.deploy();

  await nft1155.deployed();

  console.log("NFT1155 deployed to:", nft1155.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
