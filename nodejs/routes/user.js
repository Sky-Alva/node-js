const express = require('express')
const router = express.Router()
const User = require('../models/user')
const {encrypt}= require ('../utility/encrypt')
const multer = require('multer')
const upload = multer({dest: 'uploads/'})
const fs = require('fs')
const UserController= require('../controllers/UserController')

router.get('/list', UserController.getUser)

router.post('/add', UserController.createUser)   
router.post('/picture', upload.single('file'), async (req,res)=> {
    console.log(req.file)
    if(req.user.id){
        const ext_index = req.file.originalname.lastIndexOf('.')
        const ext = req.file.originalname.substring(ext_index)
        const new_name = req.file.destination + req.file.filename + ext
        await fs.renameSync(req.file.path, new_name)
        const response = await User.findOneAndUpdate({
            _id: req.user.id}, {picture: new_name})
    }
    res.json({error: false})
})

router.get('/picture', async (req,res) => {
    const response = await User.findOne({
        _id: req.user.id
    }).lean()
    if (response != 0)
        console.log(response.picture)
    res.json({
        error:false
    })
})

router.post('/add', async (req, res) => {
    if(req.body.username && req.body.password){
        const user = new User({
            picture: 0,
            username: req.body.username,
            password: encrypt(req.body.password),
            name: req.body.name,
            createdAt: new Date(),
            role: req.body.role,
        })
        await user.save()
        res.json({
            err: false,
            data: user._id
        })
    }
    else{
        res.json({error: true, message: 'Missing Username or Password'})
        return
    }
})

router.post('/login', async (req,res) => {
    if(req.body.username && req.body.password){
        const userData = await User.findOne({
            username: req.body.username,
            password: encrypt(req.body.password)
        }).lean()
        
        if(userData){
            delete userData['password']
            res.json({
                error: false,
                data: userData

            })}
        else
        {
            res.json({
                error:true,
                message: 'Invalid username or password'
            })
        }}
    else {
        res.json({
            error:true,
            message: 'Missing username or password'
        })
    }})


router.get('/:username/:data', async (req, res) => {
    res.json({
        username: req.params.username,
        data: req.params.data
    })
})
module.exports = router

router.put('/password', async (req,res) =>{
    if(req.body.password){
        const response = await User.findOneAndUpdate({
            _id: req.user.id}, {password: encrypt(req.body.password)})
            res.json({
                error:false
            })
    }})

router.delete('/:username/profile', async (req,res) =>{
    const response = await User.deleteOne({
        username:req.params.username
    })
    res.json({
        error:false
    })
})

router.post('/profile')