import { useState, useCallback, useEffect } from "react"

const storageName = 'userData'

export const useAuth = () => {

    const [userId, setUserId] = useState<string | null>(null)
    const [userLogin, setUserLogin] = useState<string | null>(null)
    const [verifyHash, setVerifyHash] = useState<string | null>(null)

    const logIn = useCallback((id: string, login: string, hash: string) => {
        setUserId(id)
        setUserLogin(login)
        setVerifyHash(hash)

        localStorage.setItem(storageName, JSON.stringify({ id, login, hash }))

    }, [])

    const logOut = useCallback(() => {
        setUserId(null)
        setUserLogin(null)
        setVerifyHash(null)

        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        let data = localStorage.getItem(storageName)

        debugger

        if (data) {
            data = JSON.parse(data)

            //logIn(data.id, data.login, data.hash)
        }

    }, [])

    return { logIn, logOut, userId, userLogin, verifyHash }
}