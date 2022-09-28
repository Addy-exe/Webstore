import { useState } from "react";
import { AuthState } from "../Context/AuthContext";

export const useSignup = () => {
    const { dispatch } = AuthState()
    const [error,setError] = useState(null)
    const [isLoading,setLoading] = useState(null)

    const signup = async (email,password) => {
        setLoading(true)
        setError(null)
        const response = await fetch('http://localhost:4000/signup',{
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({email,password})
        })
        const json = await response.json()
        // handle when response fails
        if(!response.ok){
            setLoading(false)
            setError(json.error)
        }
        if(response.ok){
            // save user to localstorage
            localStorage.setItem('user',JSON.stringify(json))
            // update auth context
            dispatch({type: 'LOGIN',payload: json})
            setLoading(false)
        }
    }

    return { signup ,isLoading, error }
}