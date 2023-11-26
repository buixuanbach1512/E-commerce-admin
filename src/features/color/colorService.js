import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosConfig';

const getColors = async () => {
    const response = await axios.get(`${base_url}color/`);
    return response.data;
};

const createColors = async (color) => {
    const response = await axios.post(`${base_url}color/`, color, config);
    return response.data;
};

const getAColor = async (id) => {
    const response = await axios.get(`${base_url}color/${id}`, config);
    return response.data;
};

const updateColor = async (color) => {
    const response = await axios.put(`${base_url}color/${color.id}`, color.colorData, config);
    return response.data;
};

const deleteColor = async (id) => {
    const response = await axios.delete(`${base_url}color/${id}`, config);
    return response.data;
};

const colorService = {
    getColors,
    createColors,
    getAColor,
    updateColor,
    deleteColor,
};
export default colorService;
