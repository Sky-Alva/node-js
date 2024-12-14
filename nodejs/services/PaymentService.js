const Price_Table = require('../models/pricetable')
const ReceiptService = require('../services/ReceiptService')

class PaymentService{
    async payments(station, invoice, payment){
        if(!station.name)
            throw new Error('Missing Station name')

        if(invoice.id != payment.id){
            console.log('Invalid Payment ID')
        }
        const payment_amount = await Price_Table.getPrice(payment.models)
        if(payment_amount != invoice.amount)
            throw new Error('Invalid Payment 2')    
        else{
            const receipt = await ReceiptService.receipts(station, invoice, payment, true)
            return(receipt)
        }
    }
}

module.exports = new PaymentService()