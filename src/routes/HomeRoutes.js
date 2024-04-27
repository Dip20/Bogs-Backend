const express = require('express')
const router = express.Router()
const home = require('../controllers/HomeController')

router.get('/home', home.index)
router.get('/register', home.register)
router.get('/user/get', home.get)

module.exports = router