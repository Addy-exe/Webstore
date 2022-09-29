import { AuthState } from "../Context/AuthContext"

const Logout = () => {

    const { dispatch } = AuthState()

    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user')
        // dispatch logout action
        dispatch({type: 'LOGOUT'})
    }
    return {logout}
}

export default Logout