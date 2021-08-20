import { createContext } from 'react'

let noop = () => {}

type AuthContextType = {
    userId: string | null,
    verifyHash: string | null,
    userLogin: string | null,
    logIn: any,
    logOut: any,
    isAuth: boolean
}

export const AuthContext = createContext<AuthContextType>({
    userId: null,
    verifyHash: null,
    userLogin: null,
    logIn: noop(),
    logOut: noop(),
    isAuth: false
})