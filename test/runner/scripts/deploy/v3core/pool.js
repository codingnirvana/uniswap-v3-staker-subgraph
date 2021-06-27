async function main() {
    const [deployer] = await ethers.getSigners();
    const factoryContractAddress = process.env.FACTORY_CONTRACT_ADDR
    console.log(`Factory Contract Address - ${factoryContractAddress}`)

    const uniswapV3FactoryContractInstance = await ethers.getContractAt("IUniswapV3Factory", factoryContractAddress);
    console.log(`Contract Address: ${factoryContractAddress}`);

    const Token = await ethers.getContractFactory("Token");
    const token1 = await Token.deploy("Token1", "TK1");
    const token2 = await Token.deploy("Token2", "TK2");

    console.log(`Token1 Contract Address: ${token1.address}`);
    console.log(`Token2 Contract Address: ${token2.address}`);

    const fees = 500;

    const tx = await uniswapV3FactoryContractInstance.createPool(
        token1.address,
        token2.address,
        fees
    );

    const receipt = await tx.wait();
    const event = receipt.events?.filter((x) => {return x.event == "PoolCreated"})[0];
    
    console.log(`Pool address: ${event.args.pool}`);
}

main()
    .then(() => console.log("Successfull"))
    .catch(error => console.log(error));