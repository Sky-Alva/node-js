
class ReceiptService{
    async receipts(station, invoice,payment,status){
        if (status){
            const receipt={
                Station_name: station.name,
                invoice_ID: invoice.id,
                Battery_Models: payment.models,
                Amount: invoice.amount,
            }
            return receipt
        }
    }
}


module.exports = new ReceiptService()