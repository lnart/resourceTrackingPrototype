

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


  export function returnSortedDates(array){
    const dates = []
    for (let i = 0; i<array.length; i++){
      dates.push(array[i].Date)
    }
    return dates
  }

  export function getDocumentsOfCurrentMonth(array){
    const documents = []
    const currentMonth = new Date().getMonth()
    for(let i = 0; i<array.length; i++){
      const month = new Date(array[i].Date).getMonth()
      if(month === currentMonth){
        documents.push(array[i])
      }
    }
    return documents
  }

  export function getCountsFromDocuments(documents){
    const counts = []
    for (let i = 0; array.length; i++){
      counts.push(documents.counts)
    }
    return counts
  }

  export function calculateAverageConsumption(array){
    for(let i = 0; i<array.length; i++){

    }
  }

  export function calculateAverageOfArray(array) {
    const sortedArray = validateArrayOfNumbers(array)
    const sum = sortedArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const average = sum / sortedArray.length;
    return average;
  }

  function validateArrayOfNumbers(array){
    for(let i = 0; i<array.length; i++){
      if(typeof(array[i] !== typeof(1))){
        const index = array.indexOf(array[i])
        array.splice(index, 1)
      }
    }
    return array
  }


  

