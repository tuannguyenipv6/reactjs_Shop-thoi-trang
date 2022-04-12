import axios from 'axios';
import { API } from '../constants';

export const ApiDataProduct = `${API}/api/product`;

// GET product to key
export const getKeyProducts = async (key?: string) => {
    try {
        const response = await axios.get(`${ApiDataProduct}/${key ? key : ''}`);
        return response.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
}

// GET News
export const getProducById = async (id: string) => {
    try {
        const response = await axios.get(`${ApiDataProduct}/by_id/${id}`);
        return response.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
}

// update like product from id user
export const updateLikeProduct = async (idProduct: number) => {
    try {
        const response = await axios.get(`${ApiDataProduct}/up-heart/${idProduct}`);
        return response.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
}

// get product to type
export const getProducByType = async (type: string) => {
    try {
        const response = await axios.get(`${ApiDataProduct}/type-product/${type}`);
        
        return response.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
}

// Search product
export const searchProduct = async (valueSearch: string) => {
    try {
        const response = await axios.post(`${ApiDataProduct}/search`, {valueSearch});
        return response.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
}

// product like
export const likeProduct = async () => {
    try {
        const response = await axios.get(`${ApiDataProduct}/likes`);
        return response.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
}

// add cart product
export const addCartProduct = async (id: number, size: string) => {
    try {
        const response = await axios.post(`${ApiDataProduct}/cart/add/${id}`, {size});
        return response.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
}

// delete cart product
export const deleteCartProduct = async (id: number) => {
    try {
        const response = await axios.get(`${ApiDataProduct}/cart/delete/${id}`);
        return response.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
}

// product like
export const getCart = async () => {
    try {
        const response = await axios.get(`${ApiDataProduct}/cart`);
        return response.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
}