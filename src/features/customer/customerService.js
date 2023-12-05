import axios from '../../utils/axiosConfig';

const getUsers = async () => {
    const response = await axios.get(`user/all-users`);
    return response.data;
};

const customerService = {
    getUsers,
};
export default customerService;
