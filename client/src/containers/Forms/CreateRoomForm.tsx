import axios from 'axios'
import React, { useContext, useState } from 'react'
import Button from '../../components/Inputs/Button'
import TextInput from '../../components/Inputs/Text'
import { AuthContext } from '../../context/AuthContext'

export const CreateRoomForm: React.FC = () => {

    const [nameRoom, setNameRoom] = useState<string>('')
    const { userId } = useContext(AuthContext)

    const submitHundler = () => {
        console.log('создаем комнату')

        axios({
            method: 'post',
            url: 'http://192.168.0.51:3001/api/rooms/create-room',
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify({nameRoom, userId})
        })
            .then(res => {
                debugger
            })
    }

    return (
        <form
            onSubmit={submitHundler}
        >
            <TextInput
                name={'Имя комнаты'}
                value={nameRoom}
                setValue={(e) => setNameRoom(e)}
            />
            <Button name={'Создать комнату'} onClick={submitHundler} />
        </form>
    )
}