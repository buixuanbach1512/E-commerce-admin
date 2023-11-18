import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../features/customer/customerSlice';
const columns = [
    {
        title: 'STT',
        dataIndex: 'key',
    },
    {
        title: 'Tên khách hàng',
        dataIndex: 'name',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.name.length - b.name.length,
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'mobile',
    },
];

const Customer = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);
    const customerState = useSelector((state) => state.customer.customers);
    const data1 = [];
    for (let i = 0; i < customerState.length; i++) {
        if (customerState[i].role !== 'admin') {
            data1.push({
                key: i + 1,
                name: customerState[i].name,
                email: customerState[i].email,
                mobile: customerState[i].mobile,
            });
        }
    }
    return (
        <div>
            <h3 className="mb-4">Khách Hàng</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    );
};

export default Customer;
