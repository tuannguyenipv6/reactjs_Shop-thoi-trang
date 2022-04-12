import { createContext, ReactNode, useEffect, useReducer } from "react";
import { authReducer, IAuthState } from "../reducers";
import { AuthActionType } from "../reducers/types";
import { useRouter } from 'next/router'
import { TOKEN_NAME_LOCAL_STORAGE } from "../constants";
import setAuthToken from "../utils/setAuthToken";
import { verifyToken } from "../lib/auth";

const { SET_AUTH } = AuthActionType;

interface IAuthContext {
    authState: IAuthState;
    logoutUser: () => void;
    loadUser: () => Promise<number>;
}
const authDefault = {
    authLoading: true,      
    isAuthenticated: false, 
    user: null,            
}
export const AuthContext = createContext<IAuthContext>({
    authState: authDefault,
    logoutUser: () => {},
    loadUser: async () => -1,
});

interface IAuthContextProvider {
    children: ReactNode;
}


const AuthContextProvider = ({children}: IAuthContextProvider) => {
    const router = useRouter();
 
    // State
    const [authState, dispatch] = useReducer(authReducer, authDefault);

    const removeUser = () => {
        localStorage.removeItem(TOKEN_NAME_LOCAL_STORAGE);
        dispatch({
            type: SET_AUTH,
            payload: {
                isAuthenticated: false, 
                user: null,
            }
        });
        setAuthToken(null);
    }

    const logoutUser = () => {
        removeUser();
        router.reload();
    }

    const loadUser = async () => {
        const accessToken = localStorage[TOKEN_NAME_LOCAL_STORAGE];
        if(accessToken) {
            setAuthToken(accessToken);

            try {
                const data = await verifyToken(accessToken);
                if (data.success) {
                    dispatch({
                        type: SET_AUTH,
                        payload: {
                            isAuthenticated: true,
                            user: data.user,
                        }
                    });
                    if(data.user.admin) {
                        return 1;
                    }else {
                        return 0;
                    }
                } else {
                    removeUser();
                    return -1;
                }
            } catch (error) {
                removeUser();
                return -1;
            }
        }else {
            return -1;
        }
    }

    useEffect(() => {
        loadUser();
    }, [])

    const AuthContextData = {
        authState,
        logoutUser,
        loadUser,
    }
    return <AuthContext.Provider value={AuthContextData}>
        {children}
    </AuthContext.Provider>
}

export default AuthContextProvider;