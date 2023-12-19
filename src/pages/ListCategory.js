import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
    createCategories,
    deleteCategory,
    getCategories,
    resetState,
    updateCategory,
} from '../features/category/categorySlice';
import moment from 'moment';
import CustomModal from '../components/CustomModal';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import CustomInput from '../components/CustomInput';
import { IoClose } from 'react-icons/io5';
import { BiEdit } from 'react-icons/bi';
import { FiDelete } from 'react-icons/fi';
const columns = [
    {
        title: 'STT',
        dataIndex: 'key',
    },
    {
        title: 'Danh mục',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'createdAt',
    },
    {
        title: 'Ngày cập nhật',
        dataIndex: 'updatedAt',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];

const schema = Yup.object().shape({
    name: Yup.string().required('Chưa nhập màu sắc!'),
});

const initialValues = {
    name: '',
};

const ListCategory = () => {
    const [open, setOpen] = useState(false);
    const [catId, setCatId] = useState(null);
    const [openAdd, setOpenAdd] = useState(false);
    const [edit, setEdit] = useState(false);
    const [formData, setFormData] = useState(initialValues);

    const categoryState = useSelector((state) => state.category.categories);
    const createCatState = useSelector((state) => state.category);
    const { isError, isSuccess, isLoading, createdCategory, updatedCat } = createCatState;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    useEffect(() => {
        if (isSuccess && createdCategory) {
            toast.success('Thêm danh mục thành công!!!');
        }
        if (isSuccess && updatedCat) {
            toast.success('Cập nhật danh mục thành công!!!');
        }
        if (isError) {
            toast.error('Thất bại! Có lỗi xảy ra');
        }
    }, [isError, isSuccess, isLoading, createdCategory, updatedCat]);

    const showModal = (id) => {
        setOpen(true);
        setCatId(id);
    };
    const hideModal = () => {
        setOpen(false);
    };
    const hideAdd = () => {
        setOpenAdd(false);
        setEdit(false);
        setFormData(initialValues);
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: formData.name || '',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            if (catId !== null) {
                const data = { id: catId, dataCat: values };
                dispatch(updateCategory(data));
                setFormData(initialValues);
                setOpenAdd(false);
                setEdit(false);
                setTimeout(() => {
                    dispatch(resetState());
                    dispatch(getCategories());
                }, 200);
            } else {
                dispatch(createCategories(values));
                formik.resetForm();
                setOpenAdd(false);
                setTimeout(() => {
                    dispatch(resetState());
                    dispatch(getCategories());
                }, 200);
            }
        },
    });

    const data1 = [];
    for (let i = 0; i < categoryState.length; i++) {
        data1.push({
            key: i + 1,
            name: categoryState[i].name,
            createdAt: moment(categoryState[i].createdAt).format('DD/MM/YYYY'),
            updatedAt: moment(categoryState[i].updatedAt).format('DD/MM/YYYY'),
            action: (
                <div className="d-flex gap-10">
                    <button
                        className="text-warning bg-transparent border-0"
                        onClick={() => handleEdit(categoryState[i])}
                    >
                        <BiEdit className="icon-action" />
                    </button>
                    <button
                        className=" fs-5 text-danger bg-transparent border-0"
                        onClick={() => showModal(categoryState[i]._id)}
                    >
                        <FiDelete className="icon-action" />
                    </button>
                </div>
            ),
        });
    }

    const handleEdit = (data) => {
        setFormData(data);
        setOpenAdd(true);
        setEdit(true);
        setCatId(data._id);
    };

    const handleDelCategory = (id) => {
        dispatch(deleteCategory(id));
        setOpen(false);
        setTimeout(() => {
            dispatch(getCategories());
        }, 100);
    };
    return (
        <div className="content-wrapper bg-white p-4">
            <h2 className="mb-4">Danh Mục</h2>
            <div className="d-flex justify-content-end mb-4">
                <button className="btn btn-success border-0" onClick={() => setOpenAdd(true)}>
                    Thêm mới
                </button>
            </div>
            {openAdd && (
                <div className="addContainer d-flex justify-content-center align-items-center">
                    <div className="form-wrapper bg-white w-50">
                        <div>
                            <div className="title d-flex justify-content-between align-items-center px-3 py-2">
                                <h3 className="mb-0">{edit ? 'Sửa' : 'Thêm'} danh mục</h3>
                                <IoClose className="close-icon mb-0" onClick={hideAdd} />
                            </div>
                            <form onSubmit={formik.handleSubmit} className="px-4 py-2">
                                <CustomInput
                                    type="text"
                                    label="Nhập danh mục sản phẩm ..."
                                    onCh={formik.handleChange('name')}
                                    onBl={formik.handleBlur('name')}
                                    val={formik.values.name}
                                />
                                <div className="error text-danger">{formik.touched.name && formik.errors.name}</div>
                                <button type="submit" className="btn btn-success border-0 rounded-3 mt-4">
                                    {edit ? 'Cập nhật' : 'Thêm mới'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            <div>
                <Table columns={columns} dataSource={data1} />
                <CustomModal
                    open={open}
                    hideModal={hideModal}
                    performAction={() => handleDelCategory(catId)}
                    title="Bạn muốn xóa danh mục này?"
                />
            </div>
        </div>
    );
};

export default ListCategory;
