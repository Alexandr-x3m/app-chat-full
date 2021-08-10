import React from 'react'

import s from '../../styles/components/Inputs/Text.module.sass'


interface TextInput {
    name: string,
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    required?: boolean,
    autofocus?: boolean
}

const TextInput: React.FC<TextInput> = ({ name, value, setValue, required, autofocus}) => {

    return (
        <div className={s.container}>

            <input
                id={`text_input_${name}`}
                className={s.input}
                type="text"
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)}
                required={required}
                autoFocus={autofocus}
            />
            <label
                htmlFor={`text_input_${name}`}
                className={s.label + ' ' + (value.length > 0 ? s.not_empty : '')}
            >
                {name}
            </label>
        </div>
    )
}

export default TextInput;