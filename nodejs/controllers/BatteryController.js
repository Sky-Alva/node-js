const mongoose = require('mongoose')
const PaymentService = require('../services/PaymentService')
const Price_Table = require('../models/pricetable')
const PaymentHistory = require('../models/DBPaymentFormat')
const ChargingStationService = require('../services/ChargingStationService')
const Battery = require('../models/battery')
const express = require('express')

class BatteryController{
    async payment(station,invoice,payment){
        if(!station.name)
            throw new Error('Missing Station Name')

            if(invoice.id != payment.id){
                console.log('Invalid Payment ID')
            }
            const payment_amount = await Price_Table.getPrice(payment.models)
            if(payment_amount != invoice.amount)
                throw new Error('Invalid Payment Amount')    
            else{
                const Invoice = new PaymentHistory({
                    Station_name: station.name,
                    invoice_ID: invoice.id,
                    Battery_models: payment.models,
                    Amount: invoice.amount
                })
                await Invoice.save()

                const stations= await ChargingStationService.getStation()
                const Batterys = []
                for(let i=0;i<stations.length;i++){
                    let st = stations[i]
                    const battery = await (ChargingStationService.countBattery(st))
                    for(let j=0; j< battery.length; j++){
                        console.log(battery.status)
                        if(battery.status!='borrowed')
                            Batterys.push(battery[j])
                }
        }       
                console.log(Batterys)
                if(Batterys.length>0){
                    const battavaiable= Batterys[0]
                    const battery= await Battery.findOneAndUpdate({Models: battavaiable.Models},{status: "borrowed"})
                    
                    return(PaymentService.payments(station, invoice, payment))}
                else{
                    throw new Error('No Battery Avaiable')
    }}}

    async find_battery(){
        const stations= await ChargingStationService.getStation()
        const Battery = []
        for(let i=0;i<stations.length;i++){
            let st = stations[i]
            const battery = await (ChargingStationService.countBattery(st))
            for(let j=0; j< battery.length; j++){
                Battery.push(battery[j])
            }
        }
        return Battery
    }

    async return_battery(battery,station){
        if(!station.name)
            throw new Error('Missing Station name')
        const Batterys = await Battery.findOneAndUpdate({Models: battery.models}, {status:'charging'})
        return 0
    }
}

module.exports = new BatteryController()
