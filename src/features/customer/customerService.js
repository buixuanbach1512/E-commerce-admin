import axios from '../../utils/axiosConfig';

const getUsers = async () => {
    const response = await axios.get(`user/all-users`);
    return response.data;
};
const blockUser = async (userId) => {
    const response = await axios.put(`user/block-user/${userId}`);
    return response.data;
};

const unBlockUser = async (userId) => {
    const response = await axios.put(`user/unblock-user/${userId}`);
    return response.data;
};
const customerService = {
    getUsers,
    blockUser,
    unBlockUser,
};
export default customerService;
