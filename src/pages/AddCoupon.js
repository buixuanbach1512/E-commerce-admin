import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { createCoupons, getACoupon, resetState, updateCoupon } from '../features/coupon/couponSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';

const schema = Yup.object().shape({
    name: Yup.string().required('Chưa nhập coupon!'),
    expiry: Yup.date().required('Chưa nhập ngày hết hạn!'),
    discount: Yup.string().required('Chưa nhập giảm giá!'),
});

const AddCoupon = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const couponId = location.pathname.split('/')[3];
    const createCouponState = useSelector((state) => state.coupon);
    const { isSuccess, isError, createdCoupons, couponName, couponExpiry, couponDiscount, updatedCoup } =
        createCouponState;
    useEffect(() => {
        if (isSuccess && createdCoupons) {
            toast.success('Thêm thành công!');
        }
        if (isSuccess && updatedCoup) {
            toast.success('Cập nhật thành công!');
        }
        if (isError) {
            toast.error('Thất bại! Có lỗi xảy ra!');
        }
    }, [createdCoupons, isError, isSuccess, updatedCoup]);
    useEffect(() => {
        if (couponId !== undefined) {
            dispatch(getACoupon(couponId));
        } else {
            dispatch(resetState());
        }
    }, [dispatch, couponId]);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: couponName || '',
            expiry: moment(couponExpiry).format('YYYY-MM-DD') || '',
            discount: couponDiscount || '',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            if (couponId !== undefined) {
                const data = {
                    id: couponId,
                    couponData: values,
                };
                dispatch(updateCoupon(data));
                dispatch(resetState());
                setTimeout(() => {
                    navigate('/admin/listcoupon');
                }, 2000);
            } else {
                dispatch(createCoupons(values));
                formik.resetForm();
                setTimeout(() => {
                    dispatch(resetState());
                }, 2000);
            }
        },
    });
    return (
        <div>
            <h3 className="mb-4">{couponId !== undefined ? 'Sửa' : 'Thêm'} Phiếu Giảm Giá</h3>
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type="text"
                        onCh={formik.handleChange('name')}
                        onBl={formik.handleBlur('name')}
                        val={formik.values.name}
                        label="Nhập coupon ..."
                        i_class="w-50"
                    />
                    <div className="error text-danger">{formik.touched.name && formik.errors.name}</div>
                    <CustomInput
                        type="date"
                        onCh={formik.handleChange('expiry')}
                        onBl={formik.handleBlur('expiry')}
                        val={formik.values.expiry}
                        label="Nhập ngày hết hạn ..."
                        i_class="w-50"
                    />
                    <div className="error text-danger">{formik.touched.expiry && formik.errors.expiry}</div>
                    <CustomInput
                        type="text"
                        onCh={formik.handleChange('discount')}
                        onBl={formik.handleBlur('discount')}
                        val={formik.values.discount}
                        label="Nhập % giảm giá ..."
                        i_class="w-50"
                    />
                    <div className="error text-danger">{formik.touched.discount && formik.errors.discount}</div>
                    <button type="submit" className="btn btn-success border-0 rounded-3 my-5">
                        {couponId !== undefined ? 'Cập nhật' : 'Thêm mới'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCoupon;
