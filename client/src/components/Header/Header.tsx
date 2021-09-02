import React, { useContext } from 'react'

import s from '../../styles/components/Header.module.sass'


import { AuthContext } from '../../context/Auth.Context'
import { NavLink, Redirect } from 'react-router-dom'
import Button from '../Inputs/Button'


import avatar from '../../public/User_Placeholder.png'
import logoutIcon from '../../public/icons/logout.svg'

type HeaderTypes = {

}

export const Header: React.FC = () => {

    const { isAuth, userLogin, logOut } = useContext(AuthContext)

    

    return (
        <div className={s.container} >
            <div className={s.content} >
                <div className={s.profile_container} >
                    {isAuth
                        ? (<>
                            <div className={s.profile_auth}>
                                <img className={s.avatar} src={avatar} alt="" />
                                <p className={s.user_name} >
                                    {userLogin}
                                </p>
                            </div>
                            <Button 
                                name={''}
                                additClass={s.additClass}
                                onClick={() => logOut()}
                            >
                                <img className={s.logout_icon} src={logoutIcon} alt="" />
                            </Button>
                        </>)
                        : (<div>
                            <NavLink 
                                to="/auth" 
                                activeClassName={s.enter_btn}
                            >
                                Войти
                            </NavLink>
                        </div>)
                    }
                </div>
            </div>

        </div>
    )
}