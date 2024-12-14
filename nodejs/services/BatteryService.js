const Battery = require('../models/battery')
const BatteryActivities = require('../models/batteryactivities')
const moongose = require('mongoose')

class BatteryService{
    async addBattery(battery){
        if(!battery.Models){
            throw new Error('Missing BatteryID')
        }
        let new_Battery = new Battery({
            Capacity: battery.Capacity,
            Models: battery.Models,
            ReleaseDate: Date.now(),
            status: 'charging',
            ChargingStation : battery.ChargingStation,
        })
        await new_Battery.save()
        return new_Battery
    }

    async getBattery(){
        const battery = await Battery.find()
        return battery
    }

    async Battery_loc(){
        const battery_loc = await BatteryActivities.find().populate({path: 'BatteryID', select:'stationID',model: 'Battery'}).exec()
        return battery_loc
    }
}

module.exports = new BatteryService()