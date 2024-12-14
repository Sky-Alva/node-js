const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const userRoute = require('./routes/user')
const mongoose = require('mongoose')
const Config = require('./configs/index')
const port = Config.port
const authRoute = require('./routes/auth')
const passport = require('passport')
const cors = require('cors')
const BatteryService = require('./services/BatteryService')
const ChargingStationService = require('./services/ChargingStationService')
const PaymentService = require('./services/PaymentService')
const find_battery = require('./controllers/BatteryController')
const BatteryController = require('./controllers/BatteryController')
const batteryroute = require('./routes/battery')





const connection = () => {
    mongoose.connect(Config.db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    
    const db = mongoose.connection
    db.on('error', () => {
    console.log('DB Error')})

    db.once('open', () => {
        console.log('DB Connected')
    })
}

connection()


const addBattery = async () => {
    const Battery = ({
        Models: 231232143,
        Capacity: '100kWH',
        status: 'charging',
        ChargingStation: 'Station 2'
    })
    try{
        await BatteryService.addBattery(Battery)
    }
    catch(e){
        console.log(e)
    }
}

const countBattery = async (station) => {
    if (!station)
        throw new Error ('Missing Station name')
    try{
        const data = await ChargingStationService.getStation()
        console.log(data)
    }
    catch(e){
        console.log(e)
    }
}

const payment = async (station, invoice, payment) =>{
    const Payment_Status = await BatteryController.payment(station, invoice, payment)
    console.log(Payment_Status)
}
app.use(cors())

const findbattery = async () =>{
    const battery = await BatteryController.find_battery()
    console.log(battery)
}


const return_battery = async (battery, station) =>{
    const batterys = await BatteryController.return_battery({models: battery.models}, {name: station.name})
}
return_battery({models: 102}, {name: 'Station 1'})
//payment({name: 'abcd'},{id: 1, amount:1000},{id:1, models: 'ABCD'})

app.use(bodyParser.json({limit: '5mb'}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(passport.initialize())

app.use('/user',userRoute)
app.use('/auth', authRoute)
app.use('/battery', batteryroute)

app.post('/signup', (req, res) => {
    res.json({username: req.body.username})
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/check',(req,res) => {
    res.json({username: req.query.username,
            password: req.query.password})
})



app.listen(port, () => {
    console.log(`Server app listening on port: ${port}`)
})
