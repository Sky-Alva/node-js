const UserService = require('../services/userService')

class UserController{
    async getUser(req,res){
        try{
            const data = await UserService.getUsers()
            res.json({
                error:false,
                data
            })
        }
        catch(e){
            res.json({
                error: true,
                message:e.message
            })
        }
    }
    async createUser(req,res){
        try{
            const data = await UserService.addUser(req.body)
            res.json({
                error:false,
                data
            })
        }
        catch(e){
            res.json({
                error: true,
                message:e.message
            })
        }
    }

    async deleteUser(req,res){
        try{
            if(req.body.id){
                await UserService.deleteUser(req.body.id)
                res.json({
                    error:false,
                })}
        }
        catch(e){
            res.json({
                error: true,
                message:e.message
            })
        }
    }
}

module.exports = new UserController