import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { PROJECT_ROUTES_ENUMS } from '../Constants/Constants'


type Props = {}

const PrivateRoutes = (props: Props) => {

    /* user will thrown to home page if it is all ready logged-in */
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    if (isLoggedIn === 'true') {
        return <Navigate to={PROJECT_ROUTES_ENUMS.PRIVATE_ROUTES.HOME_PAGE} replace={true} />

    }
    return <Outlet />

}

export default PrivateRoutes

