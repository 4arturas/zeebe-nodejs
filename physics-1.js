const {ZBClient} = require("zeebe-node");
const {deploy_Process, start_Process} = require("./utils");
const zbc = new ZBClient("localhost:26500", {
    basicAuth: {
        username: "demo",
        password: "demo",
    },
    useTLS: false
});

const workerCos = zbc.createWorker({
    taskType: 'cos',
    taskHandler: job => {

        const updateToBrokerVariables = {
            cos: Math.cos(job.variables.angleDegrees * Math.PI / 180)
        }

        return job.complete(updateToBrokerVariables)
    }
});

const workerSin = zbc.createWorker({
    taskType: 'sin',
    taskHandler: job => {

        const updateToBrokerVariables = {
            sin: Math.sin(job.variables.angleDegrees * Math.PI / 180)
        }

        return job.complete(updateToBrokerVariables)
    }
});

(async () => {
    const deploymentResult = await deploy_Process(zbc, './physics-1.bpmn');
    // console.log(deploymentResult);

    const variables = {
      height: 50,
      angleDegrees: 30,
      velocityVector: 20
    };

    const result = await start_Process(zbc, "physics-1", variables);
    console.log( 'result:', result );
})();



