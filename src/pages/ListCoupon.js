import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { FiDelete } from 'react-icons/fi';
import { getCoupons } from '../features/coupon/couponSlice';
const columns = [
    {
        title: 'STT',
        dataIndex: 'key',
    },
    {
        title: 'Coupon',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
    },
    {
        title: 'Ngày hết hạn',
        dataIndex: 'expiry',
    },
    {
        title: 'Giảm giá',
        dataIndex: 'discount',
    },
    {
        title: 'Hành động',
        dataIndex: 'action',
    },
];

const ListCoupon = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCoupons());
    }, [dispatch]);
    const couponState = useSelector((state) => state.coupon.coupons);
    const data1 = [];
    for (let i = 0; i < couponState.length; i++) {
        data1.push({
            key: i + 1,
            name: couponState[i].name,
            expiry: moment(couponState[i].expiry).format('DD/MM/YYYY'),
            discount: couponState[i].discount + ' %',
            action: (
                <div className="d-flex gap-10">
                    <Link className=" fs-5 text-warning" to={`/admin/coupon/${couponState[i]._id}`}>
                        <BiEdit />
                    </Link>
                    <Link className=" fs-5 text-danger" to="/">
                        <FiDelete />
                    </Link>
                </div>
            ),
        });
    }
    return (
        <div>
            <h3 className="mb-4">Màu Sắc</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    );
};

export default ListCoupon;
