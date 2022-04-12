import axios from "axios";
import {API} from '../constants';

export const ApiUploadImg = `${API}/api/upload-image`;

// const config = {
//     'content-type': 'multipart/form-data',
// }

export const uploadImg = async (formData: any) => {
    try {
        const response = await axios.post(ApiUploadImg, formData); 

        return response.data;
    } catch (error: any) {
        if(error.response.data) return error.response.data;
        else return {
            success: false,
            message: error.message,
        }
    }
}