async function fireIncentiveCreated(uniswapContract, incentiveKey) {
    const txn = await uniswapContract.createIncentive(
        incentiveKey,
        1000
    );
    const receipt = await txn.wait();
    const event = receipt.events?.filter((x) => { return x.event == "IncentiveCreated" })[0];

    return event;
}

async function fireIncentiveEnded(uniswapContract, incentiveKey) {
    const txn = await uniswapContract.endIncentive(
        incentiveKey
    );
    const receipt = await txn.wait();
    const event = receipt.events?.filter((x) => { return x.event == "IncentiveEnded" })[0];

    return event;
}

async function main() {
    const delay = ms => new Promise(res => setTimeout(res, ms));

    const [deployer] = await ethers.getSigners();

    const uniswapStakerAddress = process.env.STAKER_CONTRACT_ADDR;
    const uniswapContract = await ethers.getContractAt("IUniswapV3Staker", uniswapStakerAddress);

    const Token = await ethers.getContractFactory("Token");
    const rewardToken = await Token.deploy("Token3", "RT");
    console.log(`Reward Token Address: ${rewardToken.address}`);

    const poolAddress = process.env.POOL_CONTRACT_ADDR;

    const block = await ethers.provider.getBlock('latest');

    const startTime = block.timestamp + 1;
    const endTime = startTime + 2;

    const incentiveKey = [
        rewardToken.address,
        poolAddress,
        startTime,
        endTime,
        deployer.address
    ];

    const txn = await uniswapContract.createIncentive(
        incentiveKey,
        1000
    );
    const receipt = await txn.wait();
    const event = receipt.events?.filter((x) => { return x.event == "IncentiveCreated" })[0];
    console.log("IncentiveCreated Event Fired");

    await delay(5000);

    const incentiveEndedEvent = await fireIncentiveEnded(uniswapContract, incentiveKey);
    console.log("IncentiveEnded Event Fired");
}

main()
    .then(() => process.exit(0))
    .catch(error => console.log(error));
