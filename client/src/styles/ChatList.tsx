import axios from 'axios'
import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { CreateRoomForm } from '../containers/Forms/CreateRoomForm'
import { PopUp } from '../containers/PopUp/PopUp'

import s from '../styles/pages/ChatList.module.sass'

type listRoomsTypes = {

}

export const ChatList: React.FC = () => {

    const [newRoom, setNewRoom] = useState<boolean>(false)

    let socketConnect = (roodId: string) => {
        console.log(`roodId  - ${roodId}`)
        io('http://localhost:3001')
    }

    let [listRooms, setListRooms] = useState<any>(null)


    useEffect(() => {

        if (!listRooms) {
            axios({
                method: 'get',
                url: `http://192.168.0.51:3001/api/rooms`,
                headers: { 'Content-Type': 'application/json' },
            })
                .then(res => {
                    debugger
                    if (res.status === 200) {
                        let data = res.data.data
                        setListRooms(data)
                    }

                })
        }

    }, [listRooms])

    const createRoom = () => {
        setNewRoom(true)
        /* axios({
            method: 'post',
            url: `http://192.168.0.51:3001/api/rooms`,
            headers: {'Content-Type': 'application/json'},
        })
        .then(res => {
            debugger
            if (res.status === 200) {
                let data = res.data.data
                setListRooms(data)
            }
            
        }) */
    }

    console.log(listRooms ? 'here 1' : 'here 2')
    console.log(listRooms)

    return (
        <div className={s.container} >
            Список чатов

            <button onClick={() => createRoom()}>Создать комнату</button>
            <div>
                {listRooms
                    ? (listRooms.map((el: any, index: any) => {
                        return (
                            <button onClick={() => socketConnect(el.id)}>
                                <div key={`chat_room_${index}`}>
                                    <h4>{el.Name}</h4>
                                    <h4>{el.ChatUser.Name}</h4>
                                </div>
                            </button>
                        )
                    }))
                    : null
                }
            </div>
            <PopUp visability={newRoom} close={setNewRoom} >
                <CreateRoomForm />
            </PopUp>
        </div>
    )
}