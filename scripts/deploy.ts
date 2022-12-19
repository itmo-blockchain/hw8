import { ethers } from "hardhat";

async function main() {
  const HashesStorage = await ethers.getContractFactory("HashesStorage");
  const hashesStorage = await HashesStorage.deploy();
 
  await hashesStorage.deployed();

  console.log("HashesStorage deployed to:", hashesStorage.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
