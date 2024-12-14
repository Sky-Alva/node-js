const moongose = require('mongoose')

const BatterySchema = new moongose.Schema({
    Capacity: String,
    Models: Number,
    ReleaseDate: Date,
    status: String,
    ChargingStation: String,
})

module.exports = moongose.model('Battery', BatterySchema)