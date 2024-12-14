const moongose = require('mongoose')

const payment = new moongose.Schema({
    invoice: Number,
    Amount: Number,
    date: Date,
})

module.exports = moongose.model('payment', payment)