import axios from "axios";
import {API} from '../constants';
import { User } from "../datatypes";
import setAuthToken from "../utils/setAuthToken";

const ApiAuth = `${API}/api/auth`;

export const verifyToken = async (token: string) => {
    try {
        setAuthToken(token);
        
        const response = await axios.get(ApiAuth); 
        return response.data;
    } catch (error) {
        console.log(error);
        return {success: false, message: 'Internal client error'}
    }
}

// Đăng nhập
export const loginUser = async (userForm: User) => {
    try {
        const response = await axios.post(`${ApiAuth}/login`, userForm); 

        return response.data;
    } catch (error: any) {
        if(error.response.data) return error.response.data;
        else return {
            success: false,
            message: error.message,
        }
    }
}

// Đăng ký
export const registerUser = async (userForm: User) => {
    try {
        const response = await axios.post(`${ApiAuth}/register`, userForm); 

        return response.data;
    } catch (error: any) {
        if(error.response.data) return error.response.data;
        else return {
            success: false,
            message: error.message,
        }
    }
}

// Upload img
export const uploadImgUser = async (nameImg: string) => {
    try {
        const response = await axios.post(`${ApiAuth}/avatar`, {img: nameImg}); 

        return response.data;
    } catch (error: any) {
        if(error.response.data) return error.response.data;
        else return {
            success: false,
            message: error.message,
        }
    }
}