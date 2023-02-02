import mongoose from "mongoose";

const consumptionDataSchema = new mongoose.Schema({
    resource: {type: String, required: true},
    email: {type: String, required: true},
    count: {type: Number, required: true},
    date: {type: Date}
})

export const ConsumptionData = mongoose.model('ConsumptionData', consumptionDataSchema)