import axios from "axios";
import {API, IShipmentDetails} from '../constants';

export const ApiShipmentDetails = `${API}/api/shipment-details`;

export const getShipmentDetails = async () => {
    try {
        const response = await axios.get(ApiShipmentDetails); 

        return response.data;
    } catch (error: any) {
        if(error.response.data) return error.response.data;
        else return {
            success: false,
            message: error.message,
        }
    }
}

export const addShipmentDetails = async (shipmentDetails: IShipmentDetails) => {
    try {
        const response = await axios.post(ApiShipmentDetails, shipmentDetails); 

        return response.data;
    } catch (error: any) {
        if(error.response.data) return error.response.data;
        else return {
            success: false,
            message: error.message,
        }
    }
}