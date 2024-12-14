const moongose = require('mongoose')

const BatteryActivitiesSchema = new moongose.Schema({
    BatteryID: moongose.Schema.Types.ObjectId, 
    ChargingStation: String,
    status: String, 
    userid: Number,
    borrowDate: Date,
    returnDate: Date,
    initialWatt: Number,
    returnWatt: Number,
})

module.exports = moongose.model('BatteryActivities', BatteryActivitiesSchema)