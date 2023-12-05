import axios from '../../utils/axiosConfig';

const login = async (userData) => {
    const response = await axios.post(`user/login-admin`, userData);
    if (response.data) {
        sessionStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const getAllOrders = async () => {
    const response = await axios.get(`user/all-order`);
    return response.data;
};

const getOrderById = async (id) => {
    const response = await axios.get(`user/order/${id}`);
    return response.data;
};

const authService = {
    login,
    getAllOrders,
    getOrderById,
};
export default authService;
