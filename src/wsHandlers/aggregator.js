export function aggregateParameters(parametersArray) {
    
    const numClients = parametersArray.size;
    if (numClients === 0) return null;

    let aggregated = null;

    parametersArray.forEach((clientParams) => {
        if (aggregated === null) {
            aggregated = [...clientParams];
        } else {
            for (let i = 0; i < aggregated.length; i++) {
                aggregated[i] += clientParams[i]
            }
        }
    })

    for (let i = 0; i < aggregated.length; i++) {
        aggregated[i] /= numClients;
    }

    return aggregated;
}
