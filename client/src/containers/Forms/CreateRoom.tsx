import React, { useState } from 'react'
import Button from '../../components/Inputs/Button'
import TextInput from '../../components/Inputs/Text'

export const CreateRoom: React.FC = () => {

    const [nameRoom, setNameRoom] = useState<string>('')

    const submitHundler = () => {
        console.log('создаем комнату')
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