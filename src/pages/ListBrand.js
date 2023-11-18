import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from '../features/brand/brandSlice';

import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { FiDelete } from 'react-icons/fi';
const columns = [
    {
        title: 'STT',
        dataIndex: 'key',
    },
    {
        title: 'Thương hiệu',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
    },
    {
        title: 'Hành động',
        dataIndex: 'action',
    },
];

const ListBrand = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBrands());
    }, [dispatch]);
    const state = useSelector((state) => state);
    console.log(state);
    const brandState = useSelector((state) => state.brand.brands);
    const data1 = [];
    for (let i = 0; i < brandState.length; i++) {
        data1.push({
            key: i + 1,
            name: brandState[i].name,
            action: (
                <div className="d-flex gap-10">
                    <Link className=" fs-5 text-warning" to="/">
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
            <h3 className="mb-4">Thương Hiệu</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    );
};

export default ListBrand;
