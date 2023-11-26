import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import { getOrderById } from '../features/auth/authSlice';
import { Link, useLocation } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { FiDelete } from 'react-icons/fi';
const columns = [
    {
        title: 'STT',
        dataIndex: 'key',
    },
    {
        title: 'Tên SP',
        dataIndex: 'name',
    },
    {
        title: 'Giá SP',
        dataIndex: 'price',
    },
    {
        title: 'Số lượng',
        dataIndex: 'count',
    },
];
const ViewOrder = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const orderId = location.pathname.split('/')[3];
    const getOrderState = useSelector((state) => state.order.getOrder);
    console.log(getOrderState);
    useEffect(() => {
        dispatch(getOrderById(orderId));
    }, [dispatch, orderId]);
    const data1 = [];
    if (getOrderState !== undefined) {
        for (let i = 0; i < getOrderState.length; i++) {
            data1.push({
                key: i + 1,
                name: getOrderState[i].product.name,
                // image: (<img src={getOrderState[i].product} />),
                count: getOrderState[i].count,
                price: getOrderState[i].price,
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
    }
    return (
        <div>
            <h3 className="mb-4">Chi Tiết Đơn Hàng</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    );
};

export default ViewOrder;
