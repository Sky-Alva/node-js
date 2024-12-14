const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const Config = require('../configs')
const User = require('../models/user')
const express = require('express')
const router = express.Router()
const passport = require('passport')
const {createToken, encrypt} = require('../utility/encrypt')
const UserController = require('../controllers/UserController')
let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = Config.privatekey;
passport.use(new JwtStrategy(opts, async(jwt_payload, done) => {
    console.log('payload', jwt_payload)
    const user = await User.findOne({_id: jwt_payload.id}.lean)
    if (user)
        return done(null,user)
    else
        return done('Invalid user id', null)
    // User.findOne({id: jwt_payload.sub}, function(err, user) {
    //     if (err) {
    //         return done(err, false);
    //     }
    //     if (user) {
    //         return done(null, user);
    //     } else {
    //         return done(null, false);
    //         // or you could create a new account
    //     }
    // });
}));

router.post('/add', UserController.createUser)
router.post('/login', async (req,res) => {
    if(req.body.username && req.body.password){
        const userData = await User.findOne({
            username: req.body.username,
            password: encrypt(req.body.password)
        }).lean()
        
        if(userData){
            delete userData['password']
            const token = createToken({
                id: userData._id,
                username: userData.username,
                name: userData.name,
                role: userData.role
            })
            userData.token = token 
            console.log(token)
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

module.exports = router