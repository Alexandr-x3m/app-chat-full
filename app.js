const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const socket = require('socket.io')
const http = require('http')

const server = http.createServer(app)
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

const dotenv = require('dotenv')
const { default: axios } = require('axios')
dotenv.config()


app.use(bodyParser.json())
app.use(cors())


// test page
app.get('/', (req, res) => {
  console.log('Home Page')
  res.send('Home Page')
})

//API routes

//authorization
app.use('/api/auth', require('./Routes/auth.routes'))
//chat rooms
app.use('/api/rooms', require('./Routes/rooms.routes'))


io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
});

server.listen(process.env.PORT_SRV, () => console.log(`Server started!! port = ${process.env.PORT_SRV}`))