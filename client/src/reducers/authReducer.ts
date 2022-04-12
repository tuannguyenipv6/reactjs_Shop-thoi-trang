import { AuthActionType } from "./types";
import { User } from "../datatypes";

// type
const { SET_AUTH } = AuthActionType;

export interface IAuthState {
    authLoading?: boolean;      
    isAuthenticated: boolean;
    user: User | null;             
}

interface IAuthAction {
    type: AuthActionType;
    payload: IAuthState;
}

export const authReducer = (state: IAuthState, action: IAuthAction) => {
    const {type, payload: {isAuthenticated, user} } = action;
    switch (type) {
        case SET_AUTH:
            return {
                ...state,
                authLoading: false,
                isAuthenticated,
                user
            }
        default:
            throw new Error('Invalid action!');
    }
}