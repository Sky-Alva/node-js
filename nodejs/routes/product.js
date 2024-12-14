const express = require('express')
const router = express.Router()
const User = require('../models/user')
const {encrypt}= require ('../utility/encrypt')
const multer = require('multer')
const upload = multer({dest: 'uploads/'})
const fs = require('fs')

router.get('/list', async (req, res) => {
    res.json({message: 'Get User List'})
})

module.exports = router
router.post('/profile')