import {
  IncentiveCreated,
  IncentiveEnded
} from "../types/UniswapV3Staker/UniswapV3Staker"

import { Incentive } from "../types/schema"
import { getIncentiveId } from "../utils/incentive"

export function handleIncentiveCreated(event: IncentiveCreated): void {

  let incentiveId = getIncentiveId(
    event.params.rewardToken,
    event.params.pool,
    event.params.startTime,
    event.params.endTime,
    event.params.refundee
  )

  let entity = new Incentive(incentiveId)

  entity.pool = event.params.pool
  entity.rewardToken = event.params.rewardToken
  entity.refundee = event.params.refundee
  entity.isActive = true

  entity.startTime = event.params.startTime
  entity.endTime = event.params.endTime
  entity.reward = event.params.reward

  entity.save()
}

export function handleIncentiveEnded(event: IncentiveEnded): void { }
