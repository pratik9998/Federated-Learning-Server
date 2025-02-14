export function aggregateParameters(parametersArray) {
  
    const numClients = parametersArray.length
  
    if (numClients === 0) return null
  
    const res = parametersArray[0];
    for(let i=0;i<parametersArray.length;i++){
      for(let j=0;j<parametersArray[i].length;j++){
        res[j] += parametersArray[i][j];
      }
    }
    let sz = parametersArray.length;
    for(let i=0;i<res.length;i++){
      res[i] = res[i]/sz;
    }
    return res
}
  