const ChargingStation = require('../models/chargingstation')
const BatteryService = require('./BatteryService')

class ChargingService{
    async getStation(){
        const stations= await ChargingStation.find().populate({path: 'owner', select: 'username name role picture',model: 'User'}).exec()
        return stations
    }
    
    async addStation(station){
        if(!station.name)
            throw new Error('Missing Username')
        let new_station = new ChargingStation({
            name:station.name,
            location: station.location,
            city:station.city,
            owner:station.owner
        })
        await new_station.save()
        return new_station
    }

    async countBattery(station){
        if(!station.name)
            throw new Error('Missing Username')
        let battery = await BatteryService.getBattery()
        const new_battery = battery.filter(battery => battery.ChargingStation == station.name)
        const new_battery1 = new_battery.filter(new_battery => new_battery.status== "charging")
        return(new_battery1)
    }
}

module.exports = new ChargingService()