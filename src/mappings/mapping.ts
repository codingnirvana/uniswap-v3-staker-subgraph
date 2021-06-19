import { BigInt, BigDecimal } from "@graphprotocol/graph-ts"
import {
  UniswapV3Staker,
  IncentiveCreated,
  IncentiveEnded
} from "../types/UniswapV3Staker/UniswapV3Staker"
import { Incentive } from "../types/schema"

export function handleIncentiveCreated(event: IncentiveCreated): void {
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  let entity = new Incentive(id);
  
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
