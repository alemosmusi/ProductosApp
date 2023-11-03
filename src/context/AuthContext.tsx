import { createContext, useEffect, useReducer } from "react";
import AsyncStorage  from '@react-native-async-storage/async-storage';
import { LoginData, LoginResponse, RegisterData, Usuario } from '../interfaces/appInterfaces';
import { AuthState, authReducer } from "./authReducer";
import cafeApi from "../api/cadeApi";


type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    singUp: (RegisterData: RegisterData) => void;
    singIn: (LoginData: LoginData) => void;
    logOut: () => void;
    removeError: () => void;
}

const authInicialState: AuthState = {
    status: 'not-authenticated',
    token: null,
    user: null,
    errorMessage: ''
}





export const AuthContext = createContext({} as AuthContextProps)





export const AuthProvider = ({children}: any)=>{

    const [state, dispatch] = useReducer(authReducer, authInicialState)


    useEffect(() => {
      
        checkToken()
        

    }, [])

    const checkToken = async()=>{

        // dispatch({type:'check'})
        
        const token =  AsyncStorage.getItem('token')

        //no token, no auth
        if(!token) return dispatch({type:'notAuthenticated'})

        //hay token
        const resp = await cafeApi.get('/auth')

        if(resp.status !== 200){
            return dispatch({type:'notAuthenticated'})
        }

        await AsyncStorage.setItem('token',resp.data.token)


        dispatch({
            type: 'singUp',
            payload: {
                token: resp.data.token,
                user: resp.data.usuario
            }
        })
    }
    

    const singIn= async({correo,password}:LoginData) => {
        try {

            const resp = await cafeApi.post<LoginResponse>('/auth/login',{correo, password})
            dispatch({
                type: 'singUp',
                payload: {
                    token: resp.data.token,
                    user: resp.data.usuario
                }
            })

            await AsyncStorage.setItem('token',resp.data.token)
            
        } catch (error:any) {
            dispatch({
                type: 'addError', 
                payload: error.response.data.msg || 'Informacion incorrecta'
            })
        }

    }
    const singUp= async({correo,password,nombre}: RegisterData) => {
        try {

            const resp = await cafeApi.post<LoginResponse>('/usuarios',{correo, password, nombre})
            dispatch({
                type: 'singUp',
                payload: {
                    token: resp.data.token,
                    user: resp.data.usuario
                }
            })

            await AsyncStorage.setItem('token',resp.data.token)
            
        } catch (error:any) {
            dispatch({
                type: 'addError', 
                payload: error.response.data.errors[0].msg || 'Revise la informacion'
            })
        }
    }



    const logOut= async() => {
        await AsyncStorage.removeItem('token')
        dispatch({type: 'logout'})
    }


    const removeError= () => {
        dispatch({type:'removeError'})
    }
    




    return (
        <AuthContext.Provider value={{
            ...state,
            singUp,
            singIn,
            logOut,
            removeError,

        }}>
            {children}
        </AuthContext.Provider>
    )





}