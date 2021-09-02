import React, { useContext } from 'react'
import { useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Auth } from './containers/Auth'
import { AuthContext } from './context/Auth.Context'
import ChatRoom from './pages/ChatRoom'
import LogIn from './pages/LogIn'
import { Registration } from './pages/Registration'
import { ChatList } from './styles/ChatList'

export const useRoutes = (isAuth: boolean) => {


    return (
        <>
            {isAuth
                ? (<Switch>
                    {/* <Route
                    path="/chat-room"
                    children={<ChatRoom />}
                /> */}
                    <Route
                        exact
                        path="/chats"
                        children={<ChatRoom />}
                    />
                    <Route
                        exact
                        path="/list-rooms"
                        children={<ChatList />}
                    />
                    <Redirect to="/list-rooms" exact />
                </Switch>)
                : (<Switch>
                    <Route
                        exact
                        path="/auth"
                        children={<LogIn />}
                    />
                    <Route
                        path="/register"
                        children={<Registration />}
                    />
                    <Redirect to="/auth" exact />
                </Switch>)
            }
        </>
    )
}