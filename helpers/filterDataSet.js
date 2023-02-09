

export function filterDataSetByResource(dataset, resource){
    const filteredData = []
    for(let i = 0; i < dataset.length; i++){
        if(dataset[i]['resource'] === resource){
            filteredData.push(dataset[i])
        }
    }return filteredData
}


export function extractGasCounts(array){
    const counts = []
    for(let i = 0; i<array.length; i++){
        for(const key in array[i]){
            if(key === 'count'){
                counts.push(array[i][key])
            }
        }
    }return counts
}



export function filterByYear(data) {
    const result = {};
  
    data.forEach(item => {
      const year = new Date(item.date).getFullYear();
      if (!result[year]) {
        result[year] = [];
      }
      result[year].push(item);
    });
  
    return result;
  }

  export function extractCounts(object, year){
    const counts = []
    for(let i = 0; i<object[year].length; i++){
      counts.push(object[year][i]['count'])
    }return counts
  }

  export function returnMonthlyBill(){
    let now = new Date()
    now = now.toDateString().toString().split(' ')[1]
    return now
  }
