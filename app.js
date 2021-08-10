const express = require('express')
const sql = require('mssql')

const dotenv = require('dotenv')
dotenv.config()


const app = express()

app.use('/api/auth', require('./Routes/auth.roures'))

app.get('/', (req, res) => {
    console.log('Home Page')
    res.send('Home Page')
})

app.listen(process.env.PORT_SRV, () => console.log(`Server started!! port = ${process.env.PORT_SRV}`))