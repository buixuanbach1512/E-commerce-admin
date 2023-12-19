import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { blockUser, getUsers, resetState, unBlockUser } from '../features/customer/customerSlice';
import { toast } from 'react-toastify';
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
        title: 'Điện thoại',
        dataIndex: 'mobile',
    },
    {
        title: 'Địa chỉ',
        dataIndex: 'address',
    },
    {
        title: 'Hành động',
        dataIndex: 'action',
    },
];

const Customer = () => {
    const [blocked, setBlocked] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);
    const customerState = useSelector((state) => state.customer);
    const getCustomersState = useSelector((state) => state.customer.customers);
    const data1 = [];
    for (let i = 0; i < getCustomersState.length; i++) {
        if (getCustomersState[i].role !== 'admin') {
            data1.push({
                key: i + 1,
                name: getCustomersState[i].name,
                email: getCustomersState[i].email,
                mobile: getCustomersState[i].mobile,
                address: getCustomersState[i].address,
                action: (
                    <>
                        {blocked ? (
                            <button
                                type="button"
                                className="bg-transparent border-0"
                                onClick={() => handleUnBlock(getCustomersState[i]._id)}
                            >
                                Hủy khóa
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="bg-transparent border-0"
                                onClick={() => handleBlock(getCustomersState[i]._id)}
                            >
                                Khóa tài khoản
                            </button>
                        )}
                    </>
                ),
            });
        }
    }
    useEffect(() => {
        if (customerState.isSuccess && customerState.blocked) {
            toast.success('Khóa tài khoản thành công');
        }
        if (customerState.isSuccess && customerState.unBlocked) {
            toast.success('Hủy khóa thành công');
        }
        if (customerState.isError) {
            toast.error('Đã có lỗi xảy ra');
        }
    }, [customerState]);
    const handleBlock = (id) => {
        dispatch(blockUser(id));
        setBlocked(true);
        setTimeout(() => {
            dispatch(resetState());
            dispatch(getUsers());
        }, 200);
    };
    const handleUnBlock = (id) => {
        dispatch(unBlockUser(id));
        setBlocked(false);
        setTimeout(() => {
            dispatch(resetState());
            dispatch(getUsers());
        }, 200);
    };
    return (
        <div className="content-wrapper bg-white p-4">
            <h3 className="mb-4">Khách Hàng</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    );
};

export default Customer;
