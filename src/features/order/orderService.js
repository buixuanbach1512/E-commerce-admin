import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosConfig';

const getAllOrders = async () => {
    const response = await axios.get(`${base_url}user/all-order`, config);
    return response.data;
};

const getOrderById = async (id) => {
    const response = await axios.get(`${base_url}user/order/${id}`, config);
    return response.data;
};

const orderService = {
    getAllOrders,
    getOrderById,
};
export default orderService;
