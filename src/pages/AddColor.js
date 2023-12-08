import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { createColors, getAColor, updateColor, resetState } from '../features/color/colorSlice';
import { useLocation, useNavigate } from 'react-router-dom';

const schema = Yup.object().shape({
    name: Yup.string().required('Chưa nhập màu sắc!'),
});

const AddColor = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const createColorState = useSelector((state) => state.color);
    const { isSuccess, isError, createdColors, colorName, updatedColor } = createColorState;
    const colorId = location.pathname.split('/')[3];
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
    useEffect(() => {
        if (colorId !== undefined) {
            dispatch(getAColor(colorId));
        } else {
            dispatch(resetState());
        }
    }, [dispatch, colorId]);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: colorName || '#000000',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            if (colorId !== undefined) {
                const data = {
                    id: colorId,
                    colorData: values,
                };
                dispatch(updateColor(data));
                setTimeout(() => {
                    dispatch(resetState());
                    navigate('/admin/listcolor');
                }, 1000);
            } else {
                dispatch(createColors(values));
                formik.resetForm();
                setTimeout(() => {
                    dispatch(resetState());
                }, 200);
            }
        },
    });
    return (
        <div>
            <h3 className="mb-4">{colorId !== undefined ? 'Sửa' : 'Thêm'} Màu Sản Phẩm</h3>
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type="color"
                        onCh={formik.handleChange('name')}
                        onBl={formik.handleBlur('name')}
                        val={formik.values.name}
                        label="Nhập màu sản phẩm ..."
                        i_class="w-25"
                    />
                    <div className="error text-danger">{formik.touched.name && formik.errors.name}</div>
                    <button type="submit" className="btn btn-success border-0 rounded-3 my-5 px-5 py-3">
                        {colorId !== undefined ? 'Cập nhật' : 'Thêm mới'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddColor;
