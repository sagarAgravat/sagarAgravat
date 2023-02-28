import { USERS } from "../Constants/Constants"

export const checkUserCredential = (email: string, password: string): boolean => {
    return !!(USERS.find(user => user.email.toString().toLowerCase().trim() === email.toString().toLowerCase().trim() && user.password === password))
}

export const getUserName = (email: string) => {
    return USERS.find(user => user.email.toString().toLowerCase().trim() === email.toString().toLowerCase().trim())?.userName
}

export const validateUser = (email: string, currentUser: string): boolean => {
    console.log('🔥 ~ validateUser ~ email', email)
    if (email && currentUser === getUserName(email)) {
        return true
    } else return false
}