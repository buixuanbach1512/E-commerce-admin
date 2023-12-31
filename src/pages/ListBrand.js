import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBrands, deleteBrand, getBrands, resetState, updateBrand } from '../features/brand/brandSlice';
import moment from 'moment';
import { Table } from 'antd';
import { BiEdit } from 'react-icons/bi';
import { FiDelete } from 'react-icons/fi';
import CustomModal from '../components/CustomModal';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import CustomInput from '../components/CustomInput';
import { IoClose } from 'react-icons/io5';
const columns = [
    {
        title: 'STT',
        dataIndex: 'key',
    },
    {
        title: 'Thương hiệu',
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
        title: 'Hành động',
        dataIndex: 'action',
    },
];
const schema = Yup.object().shape({
    name: Yup.string().required('Chưa nhập màu sắc!'),
});

const initialValues = {
    name: '',
};

const ListBrand = () => {
    const [open, setOpen] = useState(false);
    const [brandId, setBrandId] = useState(null);
    const [openAdd, setOpenAdd] = useState(false);
    const [edit, setEdit] = useState(false);
    const [formData, setFormData] = useState(initialValues);

    const brandState = useSelector((state) => state.brand.brands);
    const createBrandState = useSelector((state) => state.brand);
    const { isSuccess, isError, createdBrands, updateBr } = createBrandState;
    useEffect(() => {
        if (isSuccess && createdBrands) {
            toast.success('Thêm thành công!!!');
        }
        if (isSuccess && updateBr) {
            toast.success('Cập nhật thành công!!!');
        }
        if (isError) {
            toast.error('Thất bại! Có lỗi xảy ra!');
        }
    }, [isError, isSuccess, createdBrands, updateBr]);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBrands());
    }, [dispatch]);

    const showModal = (e) => {
        setOpen(true);
        setBrandId(e);
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
            if (brandId !== null) {
                const data = { id: brandId, brandData: values };
                dispatch(updateBrand(data));
                setEdit(false);
                setOpenAdd(false);
                setFormData(initialValues);
                setTimeout(() => {
                    dispatch(resetState());
                    dispatch(getBrands());
                }, 200);
            } else {
                dispatch(createBrands(values));
                formik.resetForm();
                setOpenAdd(false);
                setTimeout(() => {
                    dispatch(resetState());
                    dispatch(getBrands());
                }, 200);
            }
        },
    });

    const data1 = [];
    for (let i = 0; i < brandState.length; i++) {
        data1.push({
            key: i + 1,
            name: brandState[i].name,
            createdAt: moment(brandState[i].createdAt).format('DD/MM/YYYY'),
            updatedAt: moment(brandState[i].updatedAt).format('DD/MM/YYYY'),
            action: (
                <div className="d-flex gap-10">
                    <button className="text-warning bg-transparent border-0" onClick={() => handleEdit(brandState[i])}>
                        <BiEdit className="icon-action" />
                    </button>
                    <button
                        className="text-danger bg-transparent border-0"
                        onClick={() => showModal(brandState[i]._id)}
                    >
                        <FiDelete className=" icon-action" />
                    </button>
                </div>
            ),
        });
    }

    const handleEdit = (data) => {
        setFormData(data);
        setOpenAdd(true);
        setEdit(true);
        setBrandId(data._id);
    };

    const handleDelBrand = (id) => {
        dispatch(deleteBrand(id));
        setOpen(false);
        setTimeout(() => {
            dispatch(getBrands());
        }, 100);
    };
    return (
        <div className="content-wrapper bg-white p-4">
            <h2 className="mb-4">Thương Hiệu</h2>
            <div className="d-flex justify-content-end mb-4">
                <button className="btn btn-success border-0" onClick={() => setOpenAdd(true)}>
                    Thêm mới
                </button>
            </div>
            {openAdd && (
                <div className="addContainer d-flex justify-content-center align-items-center">
                    <div className="form-wrapper bg-white w-50">
                        <div className="title d-flex justify-content-between align-items-center px-3 py-2">
                            <h3 className="mb-0">{edit ? 'Sửa' : 'Thêm'} thương hiệu</h3>
                            <IoClose className="close-icon mb-0" onClick={hideAdd} />
                        </div>
                        <form onSubmit={formik.handleSubmit} className="px-4 py-2">
                            <CustomInput
                                type="text"
                                label="Nhập thương hiệu ..."
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
            )}
            <div>
                <Table columns={columns} dataSource={data1} />
                <CustomModal
                    performAction={() => handleDelBrand(brandId)}
                    hideModal={hideModal}
                    open={open}
                    title="Bạn có chắc muốn xóa thương hiệu này?"
                />
            </div>
        </div>
    );
};

export default ListBrand;
