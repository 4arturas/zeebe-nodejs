const {ZBClient} = require("zeebe-node");
const {deploy_Process, start_Process} = require("./utils");
const zbc = new ZBClient("localhost:26500", {
    basicAuth: {
        username: "demo",
        password: "demo",
    },
    useTLS: false
});

(async () => {
    const deploymentResult = await deploy_Process(zbc, './discount.bpmn');
    console.log(deploymentResult);

    const result = await start_Process(zbc, "CalculateDiscount", {});
    console.log( result );
})();

