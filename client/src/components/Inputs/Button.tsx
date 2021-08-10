import React from 'react'

import s from '../../styles/components/Inputs/Button.module.sass'


interface Button {
    name: string,
    onClick: Function
}

const Button: React.FC<Button> = ({ name, onClick }) => {

    

    return (
        <div className={s.container}> 
            <input 
                type="button"
                className={s.button} 
                value={name}
                onClick={(e: React.MouseEvent<HTMLInputElement>) => onClick(e)}
            />
        </div>
    )
}

export default Button;