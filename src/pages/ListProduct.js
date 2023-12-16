import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
    createProducts,
    deleteProduct,
    getProducts,
    resetState,
    updateProduct,
} from '../features/product/productSlice';
import { BiEdit } from 'react-icons/bi';
import { FiDelete } from 'react-icons/fi';
import CustomModal from '../components/CustomModal';
import CustomInput from '../components/CustomInput';
import { Select } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Dropzone from 'react-dropzone';
import { IoClose } from 'react-icons/io5';
import { getColors } from '../features/color/colorSlice';
import { deleteImg, uploadImg } from '../features/upload/uploadSlice';
import { getBrands } from '../features/brand/brandSlice';
import { getCategories } from '../features/category/categorySlice';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const columns = [
    {
        title: 'STT',
        dataIndex: 'key',
    },
    {
        title: 'Tên sản phẩm',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
    },
    {
        title: 'Ảnh',
        dataIndex: 'image',
    },
    {
        title: 'Thương Hiệu',
        dataIndex: 'brand',
        sorter: (a, b) => a.brand.length - b.brand.length,
    },
    {
        title: 'Danh mục',
        dataIndex: 'category',
        sorter: (a, b) => a.category.length - b.category.length,
    },
    {
        title: 'Màu sắc',
        dataIndex: 'color',
    },
    {
        title: 'Giá tiền',
        dataIndex: 'price',
        sorter: (a, b) => a.price.length - b.price.length,
    },
    {
        title: 'Hành động',
        dataIndex: 'action',
    },
];

let schema = Yup.object().shape({
    name: Yup.string().required('Chưa nhập tên sản phẩm!'),
    description: Yup.string().required('Chưa nhập mô tả!'),
    price: Yup.number().required('Chưa nhập giá sản phẩm!'),
    brand: Yup.string().required('Chưa chọn thương hiệu!'),
    category: Yup.string().required('Chưa chọn danh mục!'),
    tags: Yup.string().required('Chưa chọn Tags!'),
    quantity: Yup.number().required('Chưa nhập số lượng sản phẩm!'),
});

const ListProduct = () => {
    const dispatch = useDispatch();
    const initialValues = {
        name: '',
        price: '',
        quantity: '',
        description: '',
        tags: '',
        category: '',
        brand: '',
        color: '',
        images: '',
    };
    const [open, setOpen] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [prodId, setProdId] = useState(null);
    const [colorP, setColorP] = useState([]);
    const [edit, setEdit] = useState(false);
    const [formData, setFormData] = useState(initialValues);
    const prodState = useSelector((state) => state.product);
    const colorState = useSelector((state) => state.color.colors);
    const uploadState = useSelector((state) => state?.upload?.images);
    const brandState = useSelector((state) => state.brand.brands);
    const categoryState = useSelector((state) => state.category.categories);
    const productState = useSelector((state) => state.product.products);
    useEffect(() => {
        dispatch(getProducts());
        dispatch(getBrands());
        dispatch(getCategories());
        dispatch(getColors());
    }, [dispatch]);
    useEffect(() => {
        if (prodState.isSuccess && prodState.createProduct) {
            toast.success('Thêm sản phẩm thành công!!!');
        }
        // if (isSuccess && updatedProd) {
        //     toast.success('Cập nhật sản phẩm thành công!!!');
        // }
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
    const handleColor = (e) => {
        setColorP(e);
    };

    const img = [];
    uploadState.forEach((item) => {
        img.push({
            url: item.url,
            public_id: item.public_id,
        });
    });

    // useEffect(() => {
    //     if (prodId && edit) {
    //         for (let i = 0; i < formData.images; i++) {
    //             img.push(formData.images[i]);
    //         }
    //     }
    // }, [edit, formData, img, prodId]);

    const showModal = (id) => {
        setOpen(true);
        setProdId(id);
    };
    const hideModal = () => {
        setOpen(false);
    };
    const hideAdd = () => {
        setOpenAdd(false);
        setFormData(initialValues);
        setEdit(false);
        setColorP([]);
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: formData.name || '',
            description: formData.description || '',
            price: formData.price || '',
            category: formData.category || '',
            tags: formData.tags || '',
            brand: formData.brand || '',
            quantity: formData.quantity || '',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            if (prodId !== null) {
                const productData = {
                    data: {
                        ...values,
                        color: colorP,
                        images: formData.images,
                    },
                    id: prodId,
                };
                dispatch(updateProduct(productData));
                formik.resetForm();
                setColorP([]);
                setOpenAdd(false);
                setTimeout(() => {
                    dispatch(resetState());
                    dispatch(getProducts());
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
                setOpenAdd(false);
                setTimeout(() => {
                    dispatch(resetState());
                    dispatch(getProducts());
                }, 300);
            }
        },
    });

    // Get list
    const data1 = [];
    for (let i = 0; i < productState.length; i++) {
        data1.push({
            key: i + 1,
            name: productState[i].name,
            image: <img src={productState[i].images[0].url} alt="" width={100} height={100} />,
            brand: productState[i].brand.name,
            category: productState[i].category.name,
            color: (
                <ul className=" list-group list-group-flush">
                    {productState[i].color.slice(0, 2).map((item, index) => (
                        <li key={index} className="list-group-item">
                            <div
                                style={{
                                    width: '30px',
                                    height: '30px',
                                    background: `${item.name}`,
                                    border: '1px solid #777',
                                }}
                            ></div>
                        </li>
                    ))}
                </ul>
            ),
            price: (
                <p className="fs-6">
                    {productState[i].price.toLocaleString('vi')} <sup>đ</sup>
                </p>
            ),
            action: (
                <div className="d-flex gap-15">
                    <button
                        className="text-warning border-0 bg-transparent"
                        onClick={() =>
                            handleEdit({
                                id: productState[i]._id,
                                name: productState[i].name,
                                price: productState[i].price,
                                quantity: productState[i].quantity,
                                description: productState[i].description,
                                tags: productState[i].tags,
                                category: productState[i].category._id,
                                brand: productState[i].brand._id,
                                color: productState[i].color.map((i) => i._id),
                                images: productState[i].images,
                            })
                        }
                    >
                        <BiEdit className="icon-action" />
                    </button>
                    <button
                        className="text-danger bg-transparent border-0"
                        to="/"
                        onClick={() => showModal(productState[i]._id)}
                    >
                        <FiDelete className="icon-action" />
                    </button>
                </div>
            ),
        });
    }

    const handleEdit = (data) => {
        setOpenAdd(true);
        setFormData(data);
        setColorP(data.color);
        setEdit(true);
        setProdId(data.id);
    };

    // Delete
    const handelDelProd = (id) => {
        dispatch(deleteProduct(id));
        setOpen(false);
        setTimeout(() => {
            dispatch(getProducts());
        }, 100);
    };
    return (
        <div className="content-wrapper bg-white p-4">
            <h3 className="mb-4">Danh sách sản phẩm</h3>
            <div className="d-flex justify-content-end mb-4">
                <button className="btn btn-success border-0" onClick={() => setOpenAdd(true)}>
                    Thêm sản phẩm
                </button>
            </div>
            {openAdd && (
                <div className="addContainer d-flex justify-content-center align-items-center">
                    <div className="form bg-white w-50 px-3 rounded-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <h3 className="mt-3">Thêm sản phẩm</h3>
                            <IoClose className="close-icon" onClick={hideAdd} />
                        </div>
                        <form onSubmit={formik.handleSubmit} className="px-3">
                            <CustomInput
                                type="text"
                                label="Nhập tên sản phẩm"
                                name="name"
                                onCh={formik.handleChange('name')}
                                val={formik.values.name}
                            />
                            <CustomInput
                                type="number"
                                label="Nhập giá sản phẩm ..."
                                name="price"
                                onCh={formik.handleChange('price')}
                                val={formik.values.price}
                            />
                            <CustomInput
                                type="number"
                                label="Nhập số lượng sản phẩm ..."
                                name="quantity"
                                onCh={formik.handleChange('quantity')}
                                val={formik.values.quantity}
                            />
                            <select
                                className="form-control py-3 mt-3"
                                name="category"
                                onChange={formik.handleChange('category')}
                                value={formik.values.category}
                            >
                                <option value="">Chọn danh mục</option>
                                {categoryState.map((item, index) => {
                                    return (
                                        <option key={index} value={item._id}>
                                            {item.name}
                                        </option>
                                    );
                                })}
                            </select>
                            <select
                                className="form-control py-3 mt-3"
                                name="brand"
                                onChange={formik.handleChange('brand')}
                                value={formik.values.brand}
                            >
                                <option value="">Chọn thương hiệu</option>
                                {brandState.map((item, index) => {
                                    return (
                                        <option key={index} value={item._id}>
                                            {item.name}
                                        </option>
                                    );
                                })}
                            </select>
                            <select
                                className="form-control py-3 mt-3"
                                name="tags"
                                onChange={formik.handleChange('tags')}
                                value={formik.values.tags}
                            >
                                <option value="">Chọn tags</option>
                                <option value="Sản phẩm nổi bật">Sản phẩm nổi bật</option>
                            </select>
                            <Select
                                mode="multiple"
                                allowClear
                                className="w-100 mt-3 fs-6"
                                placeholder="Chọn màu sản phẩm"
                                defaultValue={colorP}
                                onChange={(i) => handleColor(i)}
                                options={colorOpt}
                            />
                            <ReactQuill
                                theme="snow"
                                className="mt-3"
                                onChange={formik.handleChange('description')}
                                value={formik.values.description}
                            />
                            <div className="bg-primary border-1 p-3 text-white text-center mt-3">
                                <Dropzone onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}>
                                    {({ getRootProps, getInputProps }) => (
                                        <section>
                                            <div {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                <p className="mb-0">
                                                    Kéo thả một số file vào đây hoặc click để chọn file
                                                </p>
                                            </div>
                                        </section>
                                    )}
                                </Dropzone>
                            </div>
                            {edit ? (
                                <div className="images d-flex flex-wrap gap-3">
                                    {formData.images.map((item, index) => {
                                        return (
                                            <div className="position-relative" key={index}>
                                                <button
                                                    type="button"
                                                    onClick={() => dispatch(deleteImg(item.public_id))}
                                                    className="btn-close position-absolute"
                                                    style={{ top: '2%', right: '2%' }}
                                                ></button>
                                                <img src={item.url} alt="img-product" width={100} height={100} />
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="images d-flex flex-wrap gap-3">
                                    {uploadState.map((item, index) => {
                                        return (
                                            <div className="position-relative" key={index}>
                                                <button
                                                    type="button"
                                                    onClick={() => dispatch(deleteImg(item.public_id))}
                                                    className="btn-close position-absolute"
                                                    style={{ top: '2%', right: '2%' }}
                                                ></button>
                                                <img src={item.url} alt="img-product" width={100} height={100} />
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            <button type="submit" className="btn btn-success border-0 rounded-3 mt-4">
                                Thêm mới
                            </button>
                        </form>
                    </div>
                </div>
            )}
            <div>
                <Table columns={columns} dataSource={data1} className="fs-6" />
                <CustomModal
                    title="Bạn muốn xóa sản phẩm này?"
                    hideModal={hideModal}
                    open={open}
                    performAction={() => handelDelProd(prodId)}
                />
            </div>
        </div>
    );
};

export default ListProduct;
