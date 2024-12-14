const express = require('express');
const router = express.Router();

const ChargingStation = require('../models/chargingstation');

router.post('/ChargingStation', async(req,res) => {
    if(req.user){
        const chargingstation = new ChargingStation({
            name: req.body.name,
            location: req.body.location,
            city: req.body.city,
            Geolocation: {
                longitude: req.body.longitude,
                latitude: req.body.latitude
            },
            owner: req.user._id,
            contactperson: req.body.contactperson,
            contactnumber: req.body.contactnumber,
            batterynumbers: req.body.batterynumbers,
            area: req.body.area,
            status: req.body.status
        })
        await chargingstation.save()
        res.json({
            err: false,
            data: user._id
        })
        }
    else{
        res.json({error: true, message: 'Missing Username'})
        return
    }
})
