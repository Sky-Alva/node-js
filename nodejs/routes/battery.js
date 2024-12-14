const express = require('express');
const router = express.Router();
const BatteryService= require('../services/BatteryService')


router.get('/add/:ChargingStation/:Capacity/:Models',async(req,res)=>{
    if(req.params.status=='add'){
    const BatteryDetails = await BatteryService.addBattery({
        ChargingStation: req.params.ChargingStation,
        Capacity: req.params.Capacity,
        Models: req.params.Models
    })

    res.json({
        err: false,
        Details: BatteryDetails
    })
    }
    
})