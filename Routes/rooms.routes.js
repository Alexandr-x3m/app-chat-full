const axios = require('axios')
const { Router } = require('express')


const rooms = Router()

rooms.get('/rooms', async (req, res) => {
    console.log('getRooms')
    try {
  
      await axios({
        method: 'post',
        url: process.env.DB_HOST,
        headers: { 'Content-Type': 'application/json' },
        data: {
          query: `query MyQuery {
            Chat_Rooms {
              Avatar
              Date
              Name
              Time
              id
              ChatUser {
                Name
              }
            }
          }`
        }
      })
        .then(response => {
          let data = response.data.data.Chat_Rooms
          console.log(data)
          res.status(200).json({data})
        })
        .catch(err => {
          console.log(err.message)
          res.status(400)
        })
  
    } catch (err) {
      console.log(err)
    }
  })


// api/rooms/create-room
rooms.post('/create-room', (req, res) => {

    try {

        if (!req.body.author || !req.body.name) return res.status(400)

        const { author, name } = req.body

        axios({
            method: 'post',
            url: process.env.HOST_SRV,
            headers: {'Content-Type': 'application/json'},
            data: {
                query: `mutation MyMutation {
                    insert_Chat_Rooms(objects: {
                        Author: "${author}", 
                        Name: "${name}", 
                        Avatar: "null"
                    }) {
                      affected_rows
                      returning {
                        id
                        Name
                      }
                    }
                  }`
            }
        })
            .thne(response => {
                let result = response.data.data.insert_Chat_Rooms.affected_rows

                if (result === 1) {
                    let { id, Name } = response.data.data.insert_Chat_Rooms.returning[0]

                    return res.status(200).json({id, Name})
                }
            })
            .catch(err => {
                console.log(err.message)
                return res.status(400)
            })

    } catch (err) {
        console.log(err.message)
    }
})


module.exports = rooms