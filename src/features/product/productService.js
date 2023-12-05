import axios from '../../utils/axiosConfig';

const getProducts = async () => {
    const response = await axios.get(`product/`);
    return response.data;
};

const getAProduct = async (id) => {
    const response = await axios.get(`product/${id}`);
    return response.data;
};

const createProduct = async (product) => {
    const response = await axios.post(`product/`, product);
    return response.data;
};

const updateProduct = async (product) => {
    const response = await axios.put(`product/${product.id}`, product.dataProd);
    return response.data;
};
const deleteProduct = async (id) => {
    const response = await axios.delete(`product/${id}`);
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
