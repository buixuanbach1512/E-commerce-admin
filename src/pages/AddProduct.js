import React, { useEffect, useState } from 'react';
import CustomInput from '../components/CustomInput';
import ReactQuill from 'react-quill';
import Dropzone from 'react-dropzone';
import { Select } from 'antd';
import 'react-quill/dist/quill.snow.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { getBrands } from '../features/brand/brandSlice';
import { getCategories } from '../features/category/categorySlice';
import { getColors } from '../features/color/colorSlice';
import { deleteImg, uploadImg } from '../features/upload/uploadSlice';
import { createProducts, resetState } from '../features/product/productSlice';
import { useNavigate } from 'react-router-dom';

let schema = Yup.object().shape({
    name: Yup.string().required('Chưa nhập tên sản phẩm!'),
    description: Yup.string().required('Chưa nhập mô tả!'),
    price: Yup.number().required('Chưa nhập giá sản phẩm!'),
    brand: Yup.string().required('Chưa chọn thương hiệu!'),
    category: Yup.string().required('Chưa chọn danh mục!'),
    tags: Yup.string().required('Chưa chọn Tags!'),
    color: Yup.array().required('Chưa chọn màu sản phẩm!'),
    quantity: Yup.number().required('Chưa nhập số lượng sản phẩm!'),
});

const AddProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [color, setColor] = useState([]);
    useEffect(() => {
        dispatch(getBrands());
        dispatch(getCategories());
        dispatch(getColors());
    }, [dispatch]);
    const brandState = useSelector((state) => state.brand.brands);
    const categoryState = useSelector((state) => state.category.categories);
    const colorState = useSelector((state) => state.color.colors);
    const uploadState = useSelector((state) => state.upload.images);
    const createProState = useSelector((state) => state.product);
    const { isError, isSuccess, isLoading, createProduct } = createProState;

    useEffect(() => {
        if (isSuccess && createProduct) {
            toast.success('Thêm sản phẩm thành công!!!');
        }
        if (isError) {
            toast.error('Thêm sản phẩm thất bại!!!');
        }
    }, [isError, isSuccess, isLoading, createProduct]);
    const colorOpt = [];
    colorState.forEach((item) => {
        colorOpt.push({
            value: item._id,
            label: (
                <div className="d-flex align-items-center">
                    <div className="color" style={{ width: '25px', height: '25px', background: `${item.name}` }}></div>
                </div>
            ),
        });
    });
    const img = [];
    uploadState.forEach((item) => {
        img.push({
            url: item.url,
            public_id: item.public_id,
        });
    });
    useEffect(() => {
        formik.values.color = color ? color : ' ';
        formik.values.images = img;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [color, img]);
    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            price: '',
            category: '',
            tags: '',
            brand: '',
            color: '',
            quantity: '',
            images: '',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(createProducts(values));
            formik.resetForm();
            setColor([]);
            setTimeout(() => {
                navigate('/admin/listproduct');
                dispatch(resetState());
            }, 2000);
        },
    });

    const handleColor = (e) => {
        setColor(e);
    };
    return (
        <div>
            <h3 className="mb-4">Thêm Sản Phẩm</h3>
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type="text"
                        label="Nhập tên sản phẩm ..."
                        name="name"
                        onCh={formik.handleChange('name')}
                        onBl={formik.handleBlur('name')}
                        val={formik.values.name}
                    />
                    <div className="error text-danger">{formik.touched.name && formik.errors.name}</div>
                    <CustomInput
                        type="number"
                        label="Nhập giá sản phẩm ..."
                        name="price"
                        onCh={formik.handleChange('price')}
                        onBl={formik.handleBlur('price')}
                        val={formik.values.price}
                    />
                    <div className="error text-danger">{formik.touched.price && formik.errors.price}</div>

                    <CustomInput
                        type="number"
                        label="Nhập số lượng sản phẩm ..."
                        name="quantity"
                        onCh={formik.handleChange('quantity')}
                        onBl={formik.handleBlur('quantity')}
                        val={formik.values.quantity}
                    />
                    <div className="error text-danger">{formik.touched.quantity && formik.errors.quantity}</div>
                    <select
                        onChange={formik.handleChange('category')}
                        onBlur={formik.handleBlur('category')}
                        value={formik.values.category}
                        name="category"
                        id=""
                        className="form-control py-3 mt-3"
                        style={{ fontSize: 14 }}
                    >
                        <option value="">Chọn Danh mục</option>
                        {categoryState.map((item, index) => {
                            return (
                                <option key={index} value={item._id}>
                                    {item.name}
                                </option>
                            );
                        })}
                    </select>
                    <div className="error text-danger">{formik.touched.category && formik.errors.category}</div>
                    <select
                        onChange={formik.handleChange('tags')}
                        onBlur={formik.handleBlur('tags')}
                        value={formik.values.tags}
                        name="tags"
                        id=""
                        className="form-control py-3 mt-3"
                        style={{ fontSize: 14 }}
                    >
                        <option value="" disabled>
                            Tags
                        </option>
                        <option value="featured">Sản phẩm nổi bật</option>
                        <option value="popular">Sản phẩm phổ biến</option>
                        <option value="special">Sản phẩm đặc biệt</option>
                    </select>
                    <div className="error text-danger">{formik.touched.tags && formik.errors.tags}</div>
                    <select
                        onChange={formik.handleChange('brand')}
                        onBlur={formik.handleBlur('brand')}
                        value={formik.values.brand}
                        name="brand"
                        id=""
                        className="form-control py-3 mt-3"
                        style={{ fontSize: 14 }}
                    >
                        <option value="">Chọn Thương Hiệu</option>
                        {brandState.map((item, index) => {
                            return (
                                <option key={index} value={item._id}>
                                    {item.name}
                                </option>
                            );
                        })}
                    </select>
                    <div className="error text-danger">{formik.touched.brand && formik.errors.brand}</div>

                    <Select
                        mode="multiple"
                        allowClear
                        className="w-100 mt-3"
                        placeholder="Chọn màu sản phẩm"
                        defaultValue={color}
                        onChange={(i) => handleColor(i)}
                        options={colorOpt}
                    />
                    <div className="error text-danger">{formik.touched.color && formik.errors.color}</div>
                    <ReactQuill
                        theme="snow"
                        name="description"
                        onChange={formik.handleChange('description')}
                        value={formik.values.description}
                        className="mt-3"
                    />
                    <div className="error text-danger">{formik.touched.description && formik.errors.description}</div>
                    <div className="bg-primary border-1 p-3 text-white text-center mt-3">
                        <Dropzone onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}>
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>Kéo thả một số file vào đây hoặc click để chọn file</p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </div>
                    <div className="images d-flex flex-wrap gap-3">
                        {uploadState?.map((item, index) => {
                            return (
                                <div className="position-relative" key={index}>
                                    <button
                                        type="button"
                                        onClick={() => dispatch(deleteImg(item.public_id))}
                                        className="btn-close position-absolute"
                                        style={{ top: '10px', right: '10px' }}
                                    ></button>
                                    <img src={item.url} alt="img-product" width={200} height={200} />
                                </div>
                            );
                        })}
                    </div>
                    <button type="submit" className="btn btn-success border-0 rounded-3 my-5">
                        Thêm Sản Phẩm
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
