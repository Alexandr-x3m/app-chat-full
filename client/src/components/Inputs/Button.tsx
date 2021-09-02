import React from 'react'

import s from '../../styles/components/Inputs/Button.module.sass'


interface Button {
    name: string,
    onClick: Function,
    additClass?: string
}

const Button: React.FC<Button> = ({ name, onClick, additClass, ...props }) => {



    return (
        <label htmlFor={`button_${name}`} >
            <div className={s.container + ' ' + additClass}>
                <input
                    id={`button_${name}`}
                    type="button"
                    className={s.button}
                    value={name}
                    onClick={(e: React.MouseEvent<HTMLInputElement>) => onClick(e)}
                />
                <div className={s.children}>
                    {props.children}
                </div>
            </div>
        </label>
    )
}

export default Button;