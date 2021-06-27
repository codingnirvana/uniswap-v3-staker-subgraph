async function main() {
    const [deployer] = await ethers.getSigners();
    console.log(`Deploying contracts with account address: ${deployer.address}`);

    const factoryContractAddress = process.env.FACTORY_CONTRACT_ADDR
    const positionManagerContractAddress = process.env.POSITION_MANAGER_CONTRACT_ADDR

    const UniswapV3Staker = await ethers.getContractFactory("UniswapV3Staker");
    const uniswapV3Staker = await UniswapV3Staker.deploy(
        factoryContractAddress,
        positionManagerContractAddress,
        1000,
        110000
    );

    console.log(`UniswapV3Staker Address: ${uniswapV3Staker.address}`);
}

main()
.then(() => console.log("Exited Properly"))
.catch(error => {
    console.log(error);
});