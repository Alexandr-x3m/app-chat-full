import axios from "axios"
import { useEffect, useCallback, useState } from "react"


type UseAuthTypes = {
    verHash: string,
    login: string,
    userID: string
}

const storageName = 'userData'

export const useAuth = () => {

    const [verifyHash, setVerifyHash] = useState<string | null>(null)
    const [userId, setUserId] = useState<string | null>(null)
    const [userLogin, setUserLogin] = useState<string | null>(null)
    const [isAuth, setIsAuth] = useState<boolean>(false)

    const logIn = useCallback((userId: string, verifyHash: string, userLogin: string) => {
        setVerifyHash(verifyHash)
        setUserId(userId)
        setUserLogin(userLogin)
        setIsAuth(true)

        localStorage.setItem(storageName, JSON.stringify({
            UID: userId,
            VFH: verifyHash,
            LGU: userLogin
        }))
    }, [])

    const logOut = useCallback(() => {
        debugger
        setVerifyHash(null)
        setUserId(null)
        setUserLogin(null)
        setIsAuth(false)
        
        localStorage.removeItem(storageName)
    }, [])

    const checkUser = useCallback(async (data: string) => {

        await axios({
            method: 'post',
            url: 'http://192.168.0.51:3001/api/auth/checkUser',
            headers: {'Content-Type': 'application/json'},
            data: data
        })
            .then(res => {
                let parse = JSON.parse(data)
                if (res.status === 200) return logIn(parse.UID, parse.VFH, parse.LGU)
            })
            .catch(err => console.log(err.message))
    }, [])

    useEffect(() => {
        let data = localStorage.getItem(storageName)

        if (data) {
            checkUser(data)
        } else {
            logOut()
        }

        return () => {}
    }, []) 

    return { logIn, logOut, verifyHash, userId, userLogin, isAuth}
}