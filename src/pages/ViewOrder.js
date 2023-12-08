import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import { getOrderById } from '../features/auth/authSlice';
import { useLocation } from 'react-router-dom';
const columns = [
    {
        title: 'STT',
        dataIndex: 'key',
    },
    {
        title: 'Sản phẩm',
        dataIndex: 'name',
    },
    {
        title: 'Ảnh',
        dataIndex: 'image',
    },
    {
        title: 'Màu sắc',
        dataIndex: 'color',
    },
    {
        title: 'Giá',
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
    const getOrderState = useSelector((state) => state.auth.getOrder);
    console.log(getOrderState);
    useEffect(() => {
        dispatch(getOrderById(orderId));
    }, [dispatch, orderId]);
    const data1 = [];
    if (getOrderState !== undefined) {
        for (let i = 0; i < getOrderState.orderItems.length; i++) {
            data1.push({
                key: i + 1,
                name: getOrderState.orderItems[i].product.name,
                image: (
                    <img
                        className=" img-fluid"
                        style={{ width: 100 }}
                        src={getOrderState.orderItems[i].product.images[0].url}
                        alt="img"
                    />
                ),
                color: (
                    <div
                        style={{
                            width: '30px',
                            height: '30px',
                            background: `${getOrderState.orderItems[i].color.name}`,
                            borderRadius: '50%',
                        }}
                    ></div>
                ),
                price: getOrderState.orderItems[i].product.price,
                count: getOrderState.orderItems[i].quantity,
            });
        }
    }
    return (
        <div>
            <h3 className="mb-4">Chi Tiết Đơn Hàng</h3>
            <div className="content-wrapper bg-white p-4">
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    );
};

export default ViewOrder;
