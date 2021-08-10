import React from 'react'

import s from '../../styles/components/Message.module.sass'
import placeholder from '../../public/User_Placeholder.png'

interface Message {
    author: string,
    text: string,
    time: string
}

const Message: React.FC<Message> = ({author, text, time}) => {

    return (
        <div className={s.container} >
            <div className={s.avatar_user}>
                <img src={placeholder} />
            </div>
            <div className={s.message_container} >
                <span className={s.author} >
                    {author}
                </span>
                <p className={s.text} >
                    {text}
                </p>
                <span className={s.time} >
                    {time}
                </span>
            </div>
        </div>
    )
}

export default Message;