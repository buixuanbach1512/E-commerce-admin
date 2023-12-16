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
import { createProducts, getAProduct, resetState, updateProduct } from '../features/product/productSlice';
import { useLocation } from 'react-router-dom';

let schema = Yup.object().shape({
    name: Yup.string().required('Chưa nhập tên sản phẩm!'),
    description: Yup.string().required('Chưa nhập mô tả!'),
    price: Yup.number().required('Chưa nhập giá sản phẩm!'),
    brand: Yup.string().required('Chưa chọn thương hiệu!'),
    category: Yup.string().required('Chưa chọn danh mục!'),
    tags: Yup.string().required('Chưa chọn Tags!'),
    quantity: Yup.number().required('Chưa nhập số lượng sản phẩm!'),
});

const AddProduct = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const proId = location.pathname.split('/')[3];

    const [colorP, setColorP] = useState([]);
    useEffect(() => {
        dispatch(resetState());
        dispatch(getBrands());
        dispatch(getCategories());
        dispatch(getColors());
    }, [dispatch]);
    const brandState = useSelector((state) => state.brand.brands);
    const categoryState = useSelector((state) => state.category.categories);
    const colorState = useSelector((state) => state.color.colors);
    const uploadState = useSelector((state) => state.upload.images);
    const prodState = useSelector((state) => state.product);

    useEffect(() => {
        if (prodState.isSuccess && prodState.createProduct) {
            toast.success('Thêm sản phẩm thành công!!!');
        }
        if (prodState.isSuccess && prodState.updatedProd) {
            toast.success('Cập nhật sản phẩm thành công!!!');
        }
        if (prodState.isError) {
            toast.error('Thêm sản phẩm thất bại!!!');
        }
    }, [prodState]);
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
        if (proId !== undefined) {
            dispatch(getAProduct(proId));
        } else {
            dispatch(resetState());
        }
    }, [dispatch, proId]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: prodState?.getAProduct?.name || '',
            description: prodState?.getAProduct?.description || '',
            price: prodState?.getAProduct?.price || '',
            category: prodState?.getAProduct?.category?._id || '',
            tags: prodState?.getAProduct?.tags || '',
            brand: prodState?.getAProduct?.brand?._id || '',
            quantity: prodState?.getAProduct?.quantity || '',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            if (proId !== undefined) {
                const data = {
                    id: proId,
                    dataProd: values,
                };
                dispatch(updateProduct(data));
                setTimeout(() => {
                    dispatch(resetState());
                }, 300);
            } else {
                const data = {
                    ...values,
                    color: colorP,
                    images: img,
                };
                dispatch(createProducts(data));
                formik.resetForm();
                setColorP([]);
                setTimeout(() => {
                    dispatch(resetState());
                }, 300);
            }
        },
    });
    const handleColor = (e) => {
        setColorP(e);
    };
    return (
        <div>
            <h3 className="mb-4">{proId !== undefined ? 'Sửa' : 'Thêm'} Sản Phẩm</h3>
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type="text"
                        label="Nhập tên sản phẩm ..."
                        onCh={formik.handleChange('name')}
                        onBl={formik.handleBlur('name')}
                        val={formik.values.name}
                    />
                    <div className="error text-danger">{formik.touched.name && formik.errors.name}</div>
                    <CustomInput
                        type="number"
                        label="Nhập giá sản phẩm ..."
                        onCh={formik.handleChange('price')}
                        onBl={formik.handleBlur('price')}
                        val={formik.values.price}
                    />
                    <div className="error text-danger">{formik.touched.price && formik.errors.price}</div>

                    <CustomInput
                        type="number"
                        label="Nhập số lượng sản phẩm ..."
                        onCh={formik.handleChange('quantity')}
                        onBl={formik.handleBlur('quantity')}
                        val={formik.values.quantity}
                    />
                    <div className="error text-danger">{formik.touched.quantity && formik.errors.quantity}</div>
                    <select
                        onChange={formik.handleChange('category')}
                        onBlur={formik.handleBlur('category')}
                        value={formik.values.category}
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
                        defaultValue={colorP}
                        onChange={(i) => handleColor(i)}
                        options={colorOpt}
                    />
                    <ReactQuill
                        theme="snow"
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
                        {proId
                            ? prodState?.getAProduct?.images?.map((item, index) => {
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
                              })
                            : uploadState.map((item, index) => {
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
                    <button type="submit" className="btn btn-success border-0 rounded-3 my-5 px-5 py-3">
                        {proId !== undefined ? 'Cập nhật' : 'Thêm mới'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
