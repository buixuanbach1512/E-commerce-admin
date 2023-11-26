import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosConfig';

const login = async (userData) => {
    const response = await axios.post(`${base_url}user/login-admin`, userData);
    if (response.data) {
        sessionStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const getAllOrders = async () => {
    const response = await axios.get(`${base_url}user/all-order`, config);
    return response.data;
};

const getOrderById = async (id) => {
    const response = await axios.get(`${base_url}user/order/${id}`, config);
    return response.data;
};

const authService = {
    login,
    getAllOrders,
    getOrderById,
};
export default authService;
