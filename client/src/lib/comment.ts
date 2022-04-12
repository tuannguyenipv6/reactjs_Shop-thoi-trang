import axios from 'axios';
import { API } from '../constants';
import { IComment } from '../datatypes';

export const ApiComment = `${API}/api/comment`;

// GET comment by product id to key
export const getCommentByProductId = async (key: string) => {
    try {
        const response = await axios.get(`${ApiComment}/${key}`);
        return response.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
}

// ADD and UPDATE comment
export const addAndUpdateComment = async (id: string, comment: IComment) => {
    try {
        const response = await axios.post(`${ApiComment}/${id}`, comment);
        return response.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
            error
        }
    }
}

