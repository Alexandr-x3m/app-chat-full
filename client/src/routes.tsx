import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Auth } from './containers/Auth'
import ChatRoom from './pages/ChatRoom'
import LogIn from './pages/LogIn'
import { Registration } from './pages/Registration'

export const Routes: React.FC<{ isAuthenticated: boolean }> = isAuthenticated => (
    <>
        {!isAuthenticated
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
                <Redirect to="/list-room" exact />
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