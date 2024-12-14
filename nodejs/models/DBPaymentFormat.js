const moongose = require('mongoose');

const DBPF = new moongose.Schema({
    Station_name: String,
    invoice_ID: Number,
    Battery_models: String,
    Amount: Number
})

module.exports= moongose.model('DBPF', DBPF)