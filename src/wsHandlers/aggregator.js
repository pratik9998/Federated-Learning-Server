export function aggregateParameters(parametersArray) {
  
    const numClients = parametersArray.length
  
    if (numClients === 0) return null
  
    const aggregated = parametersArray[0].map((_, idx) =>
      parametersArray.reduce((sum, params) => sum + params[idx], 0) / numClients
    );
  
    return aggregated
}
  