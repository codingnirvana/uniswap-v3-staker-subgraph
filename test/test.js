const { createApolloFetch } = require("apollo-fetch");
var assert = require('assert');
const path = require("path");

const srcDir = path.join(__dirname, "..");
let graphNodeIP = "127.0.0.1";

const fetchSubgraph = createApolloFetch({
    uri: `http://${graphNodeIP}:8000/subgraphs/name/codingnirvana/uniswap-v3-subgraph`,
});

const poolAddr = "0x1fa8dda81477a5b6fa1b2e149e93ed9c7928992f"
const refundeeAddr = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"
const rewardTokenAddr = "0x610178da211fef7d417bc0e6fed39f05609ad788"
const reward = 1000;

describe("Check records", function () {
    it("should equal number of events fired", async function () {
        let subgraphData = await fetchSubgraph({
            query: `{
            incentives {
                id
            }
        }`,
        });

        assert.equal(subgraphData.data.incentives.length, 1);
    });

    it("should have matching reward token address used while creation", async function () {
        let subgraphData = await fetchSubgraph({
            query: `{
            incentives {
                id
                rewardToken
            }
        }`,
        });


        for (let idx = 0; idx < subgraphData.data.incentives.length; idx++) {
            assert.equal(subgraphData.data.incentives[idx].rewardToken, rewardTokenAddr);
        }
    });

    it("should have matching pool address used while creation", async function () {
        let subgraphData = await fetchSubgraph({
            query: `{
            incentives {
                id
                pool
            }
        }`,
        });


        for (let idx = 0; idx < subgraphData.data.incentives.length; idx++) {
            assert.equal(subgraphData.data.incentives[idx].pool, poolAddr);
        }
    });

    it("should have matching refundee address used while creation", async function () {
        let subgraphData = await fetchSubgraph({
            query: `{
            incentives {
                id
                refundee
            }
        }`,
        });


        for (let idx = 0; idx < subgraphData.data.incentives.length; idx++) {
            assert.equal(subgraphData.data.incentives[idx].refundee, refundeeAddr);
        }
    });

    it("should have matching reward used while creation", async function () {
        let subgraphData = await fetchSubgraph({
            query: `{
            incentives {
                id
                reward
            }
        }`,
        });


        for (let idx = 0; idx < subgraphData.data.incentives.length; idx++) {
            assert.equal(subgraphData.data.incentives[idx].reward, reward);
        }
    });
});
