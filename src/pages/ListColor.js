import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { FiDelete } from 'react-icons/fi';
import { getColors } from '../features/color/colorSlice';
const columns = [
    {
        title: 'STT',
        dataIndex: 'key',
    },
    {
        title: 'Màu sắc',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
    },
    {
        title: 'Hành động',
        dataIndex: 'action',
    },
];

const ListColor = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getColors());
    }, [dispatch]);
    const colorState = useSelector((state) => state.color.colors);
    console.log(colorState);
    const data1 = [];
    for (let i = 0; i < colorState.length; i++) {
        data1.push({
            key: i + 1,
            name: colorState[i].name,
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
            <h3 className="mb-4">Màu Sắc</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    );
};

export default ListColor;
