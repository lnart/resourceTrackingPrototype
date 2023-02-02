

export function filterDataSet(dataset, resource){
    const filteredData = []
    for(let i = 0; i < dataset.length; i++){
        if(dataset[i]['resource'] === resource){
            filteredData.push(dataset[i])
        }
    }return filteredData
}

export function arrayDataSet(array){
    const dates = []
    for(let i = 0; i<array.length; i++){
        dates.push(array[i]['date'])
    }return dates
}

export function splitDates(array){
    let months = []
    for(let i = 0; i < array.length; i++){
        let date = new Date(array[i]);
        let month = date.getMonth() + 1;
        months.push(month);
    }
    return months
}

export function extractCounts(array){
    const counts = []
    for(let i = 0; i<array.length; i++){
        for(const key in array[i]){
            if(key === 'count'){
                counts.push(array[i][key])
            }
        }
    }return counts
}

export function gasPrice(array){
    const prices = []
    for(let i = 0; i<array.length; i++){
        prices.push(array[i]/2.6925)
    }return prices
}
