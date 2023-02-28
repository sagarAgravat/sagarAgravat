export const USERS = Object.freeze([
    { email: 'user_a@system.com', password: 'admin', userName: 'User A' },
    { email: 'user_b@system.com', password: 'admin', userName: 'User B' },
    { email: 'admin', password: 'admin', userName: 'User C' },
])

export const ARRAY_OF_DRAGGABLE_ELEMENTS = [1, 2, 3, 4]

export const PROJECT_ROUTES_ENUMS = Object.freeze({
    PUBLIC_ROUTES: {
        LOGIN_PAGE: '/auth/login',
    },
    PRIVATE_ROUTES: {
        HOME_PAGE: '/',
    }
})