const express = require('express')
const app = express()
const port = process.env.port || 5003
const BodyParser = require('body-parser')
require('dotenv').config()

const HomeRoutes = require('./routes/HomeRoutes')
const BlogRoutes = require('./routes/BlogRoutes')

app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(BodyParser.json());

app.use('/api', BlogRoutes)
app.use('/api', HomeRoutes)

app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`);
})