import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { createBrands, getABrand, resetState, updateBrand } from '../features/brand/brandSlice';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

const schema = Yup.object().shape({
    name: Yup.string().required('Chưa nhập tên thương hiệu!'),
});

const AddBrand = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const brandId = location.pathname.split('/')[3];
    const createBrandState = useSelector((state) => state.brand);
    const { isSuccess, isError, createdBrands, getBrand, updateBr } = createBrandState;
    useEffect(() => {
        if (brandId !== undefined) {
            dispatch(getABrand(brandId));
        } else {
            dispatch(resetState());
        }
    }, [brandId, dispatch]);
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

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: getBrand || '',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            if (brandId !== undefined) {
                const data = { id: brandId, brandData: values };
                dispatch(updateBrand(data));
                setTimeout(() => {
                    dispatch(resetState());
                    navigate('/admin/listbrand');
                }, 1000);
            } else {
                dispatch(createBrands(values));
                formik.resetForm();
                setTimeout(() => {
                    dispatch(resetState());
                }, 200);
            }
        },
    });

    return (
        <div>
            <h3 className="mb-4">{brandId !== undefined ? 'Chỉnh Sửa' : 'Thêm'} Thương Hiệu</h3>
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type="text"
                        label="Nhập thương hiệu ..."
                        onCh={formik.handleChange('name')}
                        onBl={formik.handleBlur('name')}
                        val={formik.values.name}
                        i_class="w-50"
                    />
                    <div className="error text-danger">{formik.touched.name && formik.errors.name}</div>
                    <button type="submit" className="btn btn-success border-0 rounded-3 my-3">
                        {brandId !== undefined ? 'Cập nhật' : 'Thêm mới'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddBrand;
