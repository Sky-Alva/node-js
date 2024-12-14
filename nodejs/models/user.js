const mongose = require('mongoose')

const userSchema = new mongose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    picture: String, 
    password: String,
    name: String,
    createdAt: Date,
    role: String,
    phone: String,
    plateNumber: String,
    adress: String,
    verificationToken: String,
    verificationTokenexpiry: Date,
    active:Boolean
})

module.exports = mongose.model('User', userSchema)