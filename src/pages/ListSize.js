import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { BiEdit } from 'react-icons/bi';
import { FiDelete } from 'react-icons/fi';
import {} from '../features/color/colorSlice';
import CustomModal from '../components/CustomModal';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import CustomInput from '../components/CustomInput';
import { IoClose } from 'react-icons/io5';
import { createSize, deleteSize, getSize, resetState, updateSize } from '../features/size/sizeSlice';

const schema = Yup.object().shape({
    name: Yup.string().required('Chưa nhập size!'),
});

const columns = [
    {
        title: 'STT',
        dataIndex: 'key',
    },
    {
        title: 'Size',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
    },
    {
        title: 'Hành động',
        dataIndex: 'action',
    },
];

const initialValues = {
    name: '',
};

const ListSize = () => {
    const [open, setOpen] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [edit, setEdit] = useState(false);
    const [sizeId, setSizeId] = useState(null);
    const [formData, setFormData] = useState(initialValues);
    const dispatch = useDispatch();
    const getAllSizeState = useSelector((state) => state.size.sizes);
    const sizeState = useSelector((state) => state.size);
    const { isSuccess, isError, createdSize, updatedSize } = sizeState;
    useEffect(() => {
        dispatch(getSize());
    }, [dispatch]);

    useEffect(() => {
        if (isSuccess && createdSize) {
            toast.success('Thêm thành công!');
        }
        if (isSuccess && updatedSize) {
            toast.success('Sửa thành công!');
        }
        if (isError) {
            toast.error('Thất bại! Có lỗi xảy ra!');
        }
    }, [createdSize, isError, isSuccess, updatedSize]);

    const showModal = (e) => {
        setOpen(true);
        setSizeId(e);
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
            if (sizeId !== null) {
                const data = {
                    id: sizeId,
                    sizeData: values,
                };
                dispatch(updateSize(data));
                setFormData(initialValues);
                setEdit(false);
                formik.resetForm();
                setSizeId(null);
                setTimeout(() => {
                    setOpenAdd(false);
                    dispatch(resetState());
                    dispatch(getSize());
                }, 200);
            } else {
                dispatch(createSize(values));
                formik.resetForm();
                setTimeout(() => {
                    setOpenAdd(false);
                    dispatch(resetState());
                    dispatch(getSize());
                }, 200);
            }
        },
    });

    const data1 = [];
    for (let i = 0; i < getAllSizeState.length; i++) {
        data1.push({
            key: i + 1,
            name: getAllSizeState[i].name,
            action: (
                <div className="d-flex gap-10">
                    <button
                        className="text-warning bg-transparent border-0"
                        onClick={() => handleEdit(getAllSizeState[i])}
                    >
                        <BiEdit className="icon-action" />
                    </button>
                    <button
                        className="text-danger bg-transparent border-0"
                        onClick={() => showModal(getAllSizeState[i]._id)}
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
        setSizeId(data._id);
    };

    const handleDelColor = (id) => {
        dispatch(deleteSize(id));
        setOpen(false);
        setSizeId(null);
        setTimeout(() => {
            dispatch(resetState());
            dispatch(getSize());
        }, 100);
    };
    return (
        <div className="content-wrapper bg-white p-4">
            <h3 className="mb-4">Size</h3>
            <div className="d-flex justify-content-end mb-4">
                <button className="btn btn-success border-0" onClick={() => setOpenAdd(true)}>
                    Thêm mới
                </button>
            </div>
            {openAdd && (
                <div className="addContainer d-flex justify-content-center align-items-center">
                    <div className="form-wrapper bg-white w-50">
                        <div className="title d-flex justify-content-between align-items-center px-3 py-2">
                            <h3 className="mb-0">{edit ? 'Thay đổi' : 'Thêm'} size</h3>
                            <IoClose className="close-icon mb-0" onClick={hideAdd} />
                        </div>
                        <form onSubmit={formik.handleSubmit} className="px-4 py-2">
                            <CustomInput
                                type="text"
                                onCh={formik.handleChange('name')}
                                onBl={formik.handleBlur('name')}
                                val={formik.values.name}
                                label="Nhập size sản phẩm ..."
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
                    performAction={() => handleDelColor(sizeId)}
                    hideModal={hideModal}
                    open={open}
                    title="Bạn có chắc muốn xóa size này?"
                />
            </div>
        </div>
    );
};

export default ListSize;
