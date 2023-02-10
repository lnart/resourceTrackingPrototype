import {filterByYear, filterDataSetByResource, returnMonthlyBill} from '../helpers/filterDataSet.js'
import {test, expect} from "vitest"

test('returns month', () => {
    let dateString = new Date()
    const result = returnMonthlyBill(dateString)

    expect(result).toBe('Feb')
})

test('filters dataset by resource', ()=>{
    const dataset = [
        {
            resource: 'gas'
        },
        {
            resource: 'electricity'
        },
        {
            resource: 'gas'
        },
        {
            recource: 'hamster'
        }
    ]
    const result = filterDataSetByResource(dataset, 'gas')
    expect(result).toEqual([{resource: 'gas'}, {resource: 'gas'}])
})


