const user = require('../models/user')
const {encrypt}= require ('../utility/encrypt')
const User = require('../models/user')



class UserService {

    async getUsers(){
        const users = await user.find()
        return users
    }
    
    async getUserById(id){
        const users = await user.findOne({_id: id})
        return users
    }
    
    async addUser(user){
        if(!user.username)
            throw new Error('Missing username')
        else if(!user.password)
            throw new Error('Missing password')
        else{
            const users = new User({
                picture: 0,
                username: user.username,
                password: encrypt(user.password),
                name: user.name,
                createdAt: new Date(),
                role: user.role,
            })
            await users.save()
        }}

    async editUser(id,updatedData){
        const users = await user.findOne({_id: id})
        if(user){
            if(updatedData.username)
                users.username = updatedData.username
            if(updatedData.password)
                users.password = updatedData.password
            if(updatedData.role)
                users.role= updatedData.role
            await users.save()
        }}

}

module.exports = new UserService()