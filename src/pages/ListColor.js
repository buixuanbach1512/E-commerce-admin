import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { BiEdit } from 'react-icons/bi';
import { FiDelete } from 'react-icons/fi';
import { createColors, deleteColor, getColors, resetState, updateColor } from '../features/color/colorSlice';
import CustomModal from '../components/CustomModal';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import CustomInput from '../components/CustomInput';
import { IoClose } from 'react-icons/io5';

const schema = Yup.object().shape({
    name: Yup.string().required('Chưa nhập màu sắc!'),
});

const columns = [
    {
        title: 'STT',
        dataIndex: 'key',
    },
    {
        title: 'Màu sắc',
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

const ListColor = () => {
    const [open, setOpen] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [edit, setEdit] = useState(false);
    const [colorId, setColorId] = useState(null);
    const [formData, setFormData] = useState(initialValues);
    const dispatch = useDispatch();
    const colorState = useSelector((state) => state.color.colors);
    const createColorState = useSelector((state) => state.color);
    const { isSuccess, isError, createdColors, updatedColor } = createColorState;
    useEffect(() => {
        dispatch(getColors());
    }, [dispatch]);

    useEffect(() => {
        if (isSuccess && createdColors) {
            toast.success('Thêm thành công!');
        }
        if (isSuccess && updatedColor) {
            toast.success('Sửa thành công!');
        }
        if (isError) {
            toast.error('Thất bại! Có lỗi xảy ra!');
        }
    }, [createdColors, isError, isSuccess, updatedColor]);

    const showModal = (e) => {
        setOpen(true);
        setColorId(e);
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
            name: formData.name || '#000000',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            if (colorId !== null) {
                const data = {
                    id: colorId,
                    colorData: values,
                };
                dispatch(updateColor(data));
                setFormData(initialValues);
                setEdit(false);
                setColorId(null);
                formik.resetForm();
                setTimeout(() => {
                    setOpenAdd(false);
                    dispatch(resetState());
                    dispatch(getColors());
                }, 200);
            } else {
                dispatch(createColors(values));
                formik.resetForm();
                setTimeout(() => {
                    setOpenAdd(false);
                    dispatch(resetState());
                    dispatch(getColors());
                }, 200);
            }
        },
    });

    const data1 = [];
    for (let i = 0; i < colorState.length; i++) {
        data1.push({
            key: i + 1,
            name: colorState[i].name,
            action: (
                <div className="d-flex gap-10">
                    <button className="text-warning bg-transparent border-0" onClick={() => handleEdit(colorState[i])}>
                        <BiEdit className="icon-action" />
                    </button>
                    <button
                        className="text-danger bg-transparent border-0"
                        onClick={() => showModal(colorState[i]._id)}
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
        setColorId(data._id);
    };

    const handleDelColor = (id) => {
        dispatch(deleteColor(id));
        setOpen(false);
        setColorId(null);
        setTimeout(() => {
            dispatch(getColors());
        }, 100);
    };
    return (
        <div className="content-wrapper bg-white p-4">
            <h3 className="mb-4">Màu Sắc</h3>
            <div className="d-flex justify-content-end mb-4">
                <button className="btn btn-success border-0" onClick={() => setOpenAdd(true)}>
                    Thêm mới
                </button>
            </div>
            {openAdd && (
                <div className="addContainer d-flex justify-content-center align-items-center">
                    <div className="form-wrapper bg-white w-50">
                        <div className="title d-flex justify-content-between align-items-center px-3 py-2">
                            <h3 className="mb-0">{edit ? 'Thay đổi' : 'Thêm'} màu sắc</h3>
                            <IoClose className="close-icon mb-0" onClick={hideAdd} />
                        </div>
                        <form onSubmit={formik.handleSubmit} className="px-4 py-2">
                            <CustomInput
                                type="color"
                                onCh={formik.handleChange('name')}
                                onBl={formik.handleBlur('name')}
                                val={formik.values.name}
                                label="Nhập màu sản phẩm ..."
                                i_class="w-25"
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
                    performAction={() => handleDelColor(colorId)}
                    hideModal={hideModal}
                    open={open}
                    title="Bạn có chắc muốn xóa màu này?"
                />
            </div>
        </div>
    );
};

export default ListColor;
