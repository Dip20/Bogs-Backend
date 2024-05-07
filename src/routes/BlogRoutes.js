const express = require('express')
const router = express.Router()
const blogs = require('../controllers/BlogController')
const validators = require('../middlewares/validators');
const BaseHelper = require('../helpers/base');

router.post('/blogs/insert', validators.validateBlogInsertion, blogs.insert)
router.put('/blogs/update/:id', validators.validateBlogInsertion, blogs.update)
router.delete('/blogs/delete/:id', blogs.delete)
router.get('/blogs/get', blogs.get)

router.post('/blogs/insert_with_image', BaseHelper.upload.single('file'), blogs.insert_with_image)
router.post('/blogs/insert_with_image2', blogs.insert_with_image_2)

module.exports = router