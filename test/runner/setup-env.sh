#!/bin/sh

cp -r ../scripts ./
cp -r ../setup-contracts ./contracts

sed -i '1s/^/import "uniswap-v3-deploy-plugin";\n/' hardhat.config.ts

npx hardhat node &
sleep 15

UNISWAP_CONTRACT_ADDRS=`npx hardhat deploy-uniswap --network localhost | grep "factory\|positionManager" | awk '{print $4}'`
export FACTORY_CONTRACT_ADDR=`echo $UNISWAP_CONTRACT_ADDRS | awk '{split($0,a," "); print a[1]}'`
export POSITION_MANAGER_CONTRACT_ADDR=`echo $UNISWAP_CONTRACT_ADDRS | awk '{split($0,a," "); print a[2]}'`

export POOL_CONTRACT_ADDR=`npx hardhat run scripts/deploy/v3core/pool.js --network localhost | grep 'Pool address' | awk '{print $3}'`
export STAKER_CONTRACT_ADDR=`npx hardhat run scripts/deploy/staker/staker.js --network localhost | grep 'UniswapV3Staker Address' | awk '{print $3}'`

echo "Uniswap Staker Address: $STAKER_CONTRACT_ADDR"
npx hardhat run scripts/events/incentive.js --network localhost

while sleep 60; do
  ps aux |grep node |grep -q -v grep
  PROCESS_1_STATUS=$?

  if [ $PROCESS_1_STATUS -ne 0 ]; then
    echo "Process has already exited."
    exit 1
  fi
done