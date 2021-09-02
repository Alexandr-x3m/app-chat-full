const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
//const socket = require('socket.io')

const dotenv = require('dotenv')
dotenv.config()


const app = express()
app.use(bodyParser.json())
app.use(cors())

app.use('/api/auth', require('./Routes/auth.routes'))

app.get('/', (req, res) => {
    console.log('Home Page')
    res.send('Home Page')
})

/* io.on('connection', (socket) => {
  console.log('a user connected');
}); */

app.listen(process.env.PORT_SRV, () => console.log(`Server started!! port = ${process.env.PORT_SRV}`))