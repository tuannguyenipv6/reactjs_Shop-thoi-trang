import axios from "axios";
import {API} from '../constants';
import { ContactInfo } from "../datatypes";

export const ApiPost = `${API}/api/contact`;

export const sendContactInfo = async (contactInfo: ContactInfo) => {
    try {
        const response = await axios.post(ApiPost, contactInfo); 

        return response.data;
    } catch (error: any) {
        if(error.response.data) return error.response.data;
        else return {
            success: false,
            message: error.message,
        }
    }
}