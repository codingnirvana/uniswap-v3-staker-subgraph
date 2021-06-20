import { BigInt, BigDecimal } from "@graphprotocol/graph-ts"
import {
  UniswapV3Staker,
  IncentiveCreated,
  IncentiveEnded
} from "../types/UniswapV3Staker/UniswapV3Staker"
import { Incentive } from "../types/schema"

export function handleIncentiveCreated(event: IncentiveCreated): void {
  // TODO : Use crypto.keccak256 from graph-ts to generate the incentivekey to be used as ID
  // TODO : Or should we use the compute function in IncentiveId.sol?
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  let entity = new Incentive(id);

  // TODO: Currently pool and rewardToken are addresses in the Entity definition.
  // I suppose we should have the Token and Pool types instead. What should be fields that would be of interest?
  // Reference - https://thegraph.com/explorer/subgraph/uniswap/uniswap-v3
  entity.pool = event.params.pool;
  entity.rewardToken = event.params.rewardToken;

  entity.refundee = event.params.refundee;
  entity.isActive = true;

  entity.startTime = event.params.startTime;
  entity.endTime = event.params.endTime;

  entity.reward = event.params.reward;

  entity.save();
}

export function handleIncentiveEnded(event: IncentiveEnded): void {}