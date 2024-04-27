const express = require('express')
const router = express.Router()
const blogs = require('../controllers/BlogController')
const validators = require('../middlewares/validators');

router.post('/blogs/insert', validators.validateBlogInsertion, blogs.insert)
router.put('/blogs/update/:id', validators.validateBlogInsertion, blogs.update)
router.delete('/blogs/delete/:id', blogs.delete)
router.get('/blogs/get', blogs.get)
module.exports = router