import axios from 'axios';
import { API } from '../constants';

export const ApiDataCommon = `${API}/api/database-common`;

// GET InfoShop
export const getInfoShop = async () => {
    try {
        const response = await axios.get(ApiDataCommon);
        return response.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
}

// GET InfoShop by key
export const getInfoShopByKey = async (key: string) => {
    try {
        const response = await axios.get(`${ApiDataCommon}/info-shop/${key}`);
        return response.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
}

// GET Introduce
export const getIntroduce = async () => {
    try {
        const response = await axios.get(`${ApiDataCommon}/introduce`);
        return response.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
}

// GET News
export const getNews = async () => {
    try {
        const response = await axios.get(`${ApiDataCommon}/news`);
        return response.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
}

// GET News
export const getNewsById = async (id: string) => {
    try {
        
        const response = await axios.get(`${ApiDataCommon}/news/${id}`);
        return response.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
}
 
// GET data by key
export const getDataByKey = async (key: string) => {
    try {
        const response = await axios.get(`${ApiDataCommon}/policy/${key}`);
        return response.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
}

// GET data by key
export const getTransportFee = async () => {
    try {
        const response = await axios.get(`${ApiDataCommon}/transport-fee`);
        return response.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
}