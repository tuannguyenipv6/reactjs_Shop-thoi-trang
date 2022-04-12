import axios from 'axios';
import { API } from '../constants';

export * from './dataCommon';
export * from './contact';
export * from './comment';
export * from './ShipmentDetails';
export * from './oder';
export * from './slider';

// Get data product or news by id
export const getProducOrNews = async (id: number, isProduct: boolean) => {
    const ApiProduct = `${API}/api/product/by_id`;
    const ApiNews = `${API}/api/database-common/news`;
    try {
        const response = await axios.get(isProduct ? `${ApiProduct}/${id}` : `${ApiNews}/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}