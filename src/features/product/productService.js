import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosConfig';

const getProducts = async () => {
    const response = await axios.get(`${base_url}product/`);
    return response.data;
};

const getAProduct = async (id) => {
    const response = await axios.get(`${base_url}product/${id}`, config);
    return response.data;
};

const createProduct = async (product) => {
    const response = await axios.post(`${base_url}product/`, product, config);

    return response.data;
};

const updateProduct = async (product) => {
    const response = await axios.put(`${base_url}product/${product.id}`, product.dataProd, config);

    return response.data;
};
const deleteProduct = async (id) => {
    const response = await axios.delete(`${base_url}product/${id}`, config);

    return response.data;
};

const productService = {
    getProducts,
    getAProduct,
    createProduct,
    updateProduct,
    deleteProduct,
};
export default productService;
