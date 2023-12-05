import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import { getAllOrders } from '../features/order/orderSlice';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { BiEdit } from 'react-icons/bi';
import { FiDelete } from 'react-icons/fi';
const columns = [
    {
        title: 'STT',
        dataIndex: 'key',
    },
    {
        title: 'Người đặt',
        dataIndex: 'name',
    },
    {
        title: 'Tổng tiền',
        dataIndex: 'amount',
    },
    {
        title: 'Ngày đặt',
        dataIndex: 'date',
    },
    {
        title: 'Sản phẩm',
        dataIndex: 'products',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];
const Order = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllOrders());
    }, [dispatch]);
    const orderState = useSelector((state) => state.order.orders);
    const data1 = [];
    for (let i = 0; i < orderState.length; i++) {
        data1.push({
            key: i + 1,
            name: orderState[i].user.name,
            amount: orderState[i].totalPrice,
            date: moment(orderState[i].orderedAt).format('DD/MM/YYYY'),
            products: <Link>Xem chi tiết</Link>,
            action: (
                <>
                    <Link className=" fs-5 text-warning" to="/">
                        <BiEdit />
                    </Link>
                    <Link className="ms-3 fs-5 text-danger" to="/">
                        <FiDelete />
                    </Link>
                </>
            ),
        });
    }
    return (
        <div>
            <h3 className="mb-4">Đơn Hàng</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    );
};

export default Order;
