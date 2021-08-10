import React from 'react'

import s from '../../styles/components/UserCell.module.sass'
import placeholder from '../../public/User_Placeholder.png'

interface UserCell {
    name: string,
    status: string
}

const UserCell: React.FC<UserCell> = ({name, status}) => {

    return (
        <div className={s.container} >
            <div className={s.avatar} >
                <img src={placeholder} />
            </div>
            <div className={s.info} >
                <span className={s.name} >
                    {name}
                </span>
                <span className={s.status + ' ' + (status === 'online' ? s.stat_online : s.stat_offline)} >
                    {status}
                </span>
            </div>
        </div>
    )
}
export default UserCell;