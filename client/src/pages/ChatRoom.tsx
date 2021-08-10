import React, { useState } from 'react'
import socket from '../socket'

import s from '../styles/containers/ChatRoom.module.sass'
import Message from '../components/Message/Message'
import UserCell from '../components/UserCell/UserCell'
import Button from '../components/Inputs/Button'

const ChatRoom: React.FC = () => {

    const [newMessage, setNewMessage] = useState<boolean>(false)

    const newMessageHandler = () => {

    } 

    return (
        <div>
            <h1>Chat Room</h1>
            <div className={s.room_container} >
                <div className={s.users_list} >
                    <UserCell 
                        name={'User Name'}
                        status={'online'}
                    />
                    <UserCell 
                        name={'New User'}
                        status={'offline'}
                    />
                </div>
                <div className={s.chat_container} >
                    <Message 
                        author={'User Name'}
                        text={'Hello, how are you?'} 
                        time={'15:45'} 
                    />
                    <Message 
                        author={'New User'}
                        text={"I'am fine? thank you"} 
                        time={'15:45'} 
                    />
                    <div className={s.new_message} >
                        <Button 
                            name={'Send new message'}
                            onClick={() => newMessageHandler()}
                        />
                    </div>
                </div>
            </div>
            {newMessage
                ? console.log('open')
                : console.log('close')
            }
        </div>
    )
}

export default ChatRoom