async function deploy_Process(zbc, process)
{
    const res = await zbc.deployProcess(process);
    return res;
}

async function start_Process(zbClient, bpmnProcessId, variables)
{
    const response = await zbClient.createProcessInstanceWithResult({
        bpmnProcessId: bpmnProcessId,
        variables: variables,
    });
    return response.variables;
}

module.exports = {
    deploy_Process,
    start_Process
};