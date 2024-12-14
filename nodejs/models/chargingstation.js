const moongose = require('mongoose');

const ChargingSchema = new moongose.Schema({
    name: String,
    location: String,
    city: String,
    owner: moongose.Schema.Types.ObjectId,
    geolocation: { longitude: Number,
        latitude: Number },
    contactperson: String,
    contactnumber: String,
    batterynumbers: Number,
    area: Number,
    status: String,
})

module.exports= moongose.model('ChargingStation', ChargingSchema)