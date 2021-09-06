import React from 'react'

import s from '../../styles/containers/PopUp.module.sass'
import Button from '../../components/Inputs/Button'
import closeIcon from '../../public/icons/close.svg'

export const PopUp: React.FC<{ visability: boolean, close: Function }> = ({ visability, close, ...props }) => {


    return (
        <>
            {visability
                ? (<div className={s.container} >
                    <button className={s.wrap} onClick={() => close(!visability)} ></button>
                    <div className={s.content_container}>
                        <div className={s.content} >
                            {props.children}
                        </div>
                        <Button
                            name={''}
                            onClick={() => close(!visability)}
                            additClass={s.close_btn}
                        >
                            <img className={s.close_icon} src={closeIcon} alt="" />
                        </Button>
                    </div>
                </div>)
                : null
            }
        </>
    )
}
