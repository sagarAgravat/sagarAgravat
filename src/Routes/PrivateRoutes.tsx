import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { PROJECT_ROUTES_ENUMS } from '../Constants/Constants';


type Props = {}

const PrivateRoutes = (props: Props) => {

    /* user will navigate to login page if it is not logged in and try to go on home page using url */
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    if (isLoggedIn !== 'true') {
        return <Navigate to={PROJECT_ROUTES_ENUMS.PUBLIC_ROUTES.LOGIN_PAGE} replace={true} />
    }

    return <Outlet />

}

export default PrivateRoutes
