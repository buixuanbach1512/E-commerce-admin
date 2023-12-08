import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createCategories, getACategory, resetState, updateCategory } from '../features/category/categorySlice';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';

const schema = Yup.object().shape({
    name: Yup.string().required('Chưa nhập tên danh mục!'),
});

const AddCat = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const createCatState = useSelector((state) => state.category);
    const { isError, isSuccess, isLoading, createdCategory, catName, updatedCat } = createCatState;
    const location = useLocation();
    const catId = location.pathname.split('/')[3];
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
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: catName || '',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            if (catId !== undefined) {
                const data = { id: catId, dataCat: values };
                dispatch(updateCategory(data));
                setTimeout(() => {
                    dispatch(resetState());
                    navigate('/admin/listcategory');
                }, 1000);
            } else {
                dispatch(createCategories(values));
                formik.resetForm();
                setTimeout(() => {
                    dispatch(resetState());
                }, 100);
            }
        },
    });

    useEffect(() => {
        if (catId !== undefined) {
            dispatch(getACategory(catId));
        } else {
            dispatch(resetState());
        }
    }, [catId, dispatch]);
    return (
        <div>
            <h3 className="mb-4">{catId !== undefined ? 'Chỉnh Sửa' : 'Thêm'} Danh Mục</h3>
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type="text"
                        label="Nhập danh mục sản phẩm ..."
                        onCh={formik.handleChange('name')}
                        onBl={formik.handleBlur('name')}
                        val={formik.values.name}
                    />
                    <div className="error text-danger">{formik.touched.name && formik.errors.name}</div>
                    <button type="submit" className="btn btn-success border-0 rounded-3 my-5 px-5 py-3">
                        {catId !== undefined ? 'Cập nhật' : 'Thêm mới'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCat;
