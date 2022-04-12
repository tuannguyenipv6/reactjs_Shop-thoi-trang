import axios from 'axios';
import { API } from '../constants';

export const ApiGeneral = `${API}/api/slider`;

export const getAllSlider = async () => {
    try {
        const response = await axios.get(`${ApiGeneral}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}