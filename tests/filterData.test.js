import {extractCounts, filterByYear, filterDataSetByResource, returnMonthlyBill} from '../helpers/filterDataSet.js'
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

test('Successfully extracts the counts into an Array', () => {
    const data = {
        2021 : [
            {
                count: 1000
            },
            {
                count: 2000
            }, 
            {
                count: 3000
            }
        ],
        2022: [
            {
                count: 4000
            }
        ]
    }

    const result = extractCounts(data, 2021)
    expect(result).toEqual([1000, 2000, 3000])
})

