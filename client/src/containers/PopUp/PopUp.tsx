import React from 'react'

import s from '../../styles/containers/PopUp.module.sass'

export const PopUp: React.FC<{ visbility: boolean, close: Function }> = ({ visbility, close, ...props }) => {

    return (
        <div className={s.container} >
            <button className={s.wrap} onClick={() => close(!visbility)} ></button>
            <div className={s.content_container }>
                <div className={s.content} >
                    {props.children}
                </div>
                <button className={s.close_btn} onClick={() => close(!visbility)} >
                    Close
                </button>
            </div>
        </div>
    )
}
