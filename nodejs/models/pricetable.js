Models = ['ABCD']

Price = [1000]

class Price_Table{
    async getPrice(Models_input){
        for (let i = 0; i<=Models.length-1; i++){
            if(Models[i] == Models_input){
                return Price[i]}


        }
    }
}

module.exports = new Price_Table()