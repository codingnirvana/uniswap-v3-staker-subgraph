import { BigInt, Address, ByteArray, crypto} from '@graphprotocol/graph-ts'
import { concatByteArrays } from "./common"

export function getIncentiveId(rewardToken: Address, pool: Address, startTime: BigInt, endTime: BigInt, refundee: Address): string {
    let eventParams = new Array<string>(5);

    eventParams[0] = rewardToken.toHex();
    eventParams[1] = pool.toHex();
    eventParams[2] = startTime.toHex();
    eventParams[3] = endTime.toHex();
    eventParams[4] = refundee.toHex();


    let incentiveParamsConcatenated: ByteArray;
    for (let i = 0; i < eventParams.length; i++) {
        incentiveParamsConcatenated = concatByteArrays(incentiveParamsConcatenated, ByteArray.fromHexString(eventParams[i]));
    }

    let id = crypto.keccak256(incentiveParamsConcatenated).toHexString();

    return id;
}