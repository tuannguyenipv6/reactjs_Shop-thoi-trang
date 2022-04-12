import axios from 'axios';
import { API } from '../constants';

export const ApiGeneral = `${API}/api/general`;

// Tạm thay đổi!
export const getAddressGeneral = async () => {
    try {
        const response = await axios.get(`${ApiGeneral}/info`);
        return response.data.general;
    } catch (error) {
        console.log(error);
    }
}
 
export const getSuperKeyGeneral = async (superKey: string) => {
    try {
        const response = await axios.get(`${ApiGeneral}/${superKey}`);
        // return response.data.CONTACT;
        return response.data;
    } catch (error: any) {
        if(error.response) return error.response;
        else return {
            success: false,
            message: error.message,
        }
    }
}

export const getAdressPhone = async () => {
    try {
        const response = await axios.get(`${ApiGeneral}/address-phone`);
        return response.data;
    } catch (error) {
        console.log(error);
        return {
            phone: 'Server đang tải ...!',
            address: {
                StoreI: 'Server đang tải ...!',
                StoreII: 'Server đang tải ...!',
            }
        };
    }
}

export const getNews = async () => {
    try {
        const response = await axios.get(`${ApiGeneral}/news`);
        return response.data;
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: 'Lỗi client',
            title: {
                _id: null,
                key: null,
                superKey: null,
                title: 'Server chưa tải!...',
                description: 'Server chưa tải!...',
            },
            news: []
        };
    }
}