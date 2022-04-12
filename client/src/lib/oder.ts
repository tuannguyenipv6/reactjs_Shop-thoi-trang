import axios from 'axios';
import { API } from '../constants';
import { IOder } from '../datatypes';

export const ApiOder = `${API}/api/oder`;

// Thêm mới đơn hàng
export const addNewOder = async (oder: IOder) => {
    try {
        const response = await axios.post(ApiOder, oder);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

// Lấy thông tin các đơn hàng của user đang login
export const getOder = async () => {
    try {
        const response = await axios.get(`${ApiOder}/user`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

// Gửi yêu cầu hủy đơn hàng
export const cancelOder = async (id: number) => {
    try {
        const response = await axios.get(`${ApiOder}/cancel/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

// Lấy thông tin tất cả các đơn hàng
export const getAllOder = async () => {
    try {
        const response = await axios.get(`${ApiOder}/admin`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

// Xóa đơn hàng by user
export const deleteByUser = async (id: number) => {
    try {
        const response = await axios.get(`${ApiOder}/delete-user/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

// Updated status
export const updatedStatus = async (id: number, value: string) => {
    try {
        const response = await axios.post(`${ApiOder}/updated-admin/${id}`, {value});
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

// Xóa đơn hàng by Admin
export const deleteByAdmin = async (id: number) => {
    try {
        const response = await axios.get(`${ApiOder}/delete/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}