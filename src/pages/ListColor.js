import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { FiDelete } from 'react-icons/fi';
import { deleteColor, getColors } from '../features/color/colorSlice';
import CustomModal from '../components/CustomModal';
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
    const [open, setOpen] = useState(false);
    const [colorId, setColorId] = useState('');
    const showModal = (e) => {
        setOpen(true);
        setColorId(e);
    };

    const hideModal = () => {
        setOpen(false);
    };
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getColors());
    }, [dispatch]);
    const colorState = useSelector((state) => state.color.colors);
    const data1 = [];
    for (let i = 0; i < colorState.length; i++) {
        data1.push({
            key: i + 1,
            name: colorState[i].name,
            action: (
                <div className="d-flex gap-10">
                    <Link className=" fs-5 text-warning" to={`/admin/color/${colorState[i]._id}`}>
                        <BiEdit />
                    </Link>
                    <button
                        className=" fs-5 text-danger bg-transparent border-0"
                        onClick={() => showModal(colorState[i]._id)}
                    >
                        <FiDelete />
                    </button>
                </div>
            ),
        });
    }

    const handleDelColor = (id) => {
        dispatch(deleteColor(id));
        setOpen(false);
        setTimeout(() => {
            dispatch(getColors());
        }, 100);
    };
    return (
        <div>
            <h3 className="mb-4">Màu Sắc</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
                <CustomModal
                    performAction={() => handleDelColor(colorId)}
                    hideModal={hideModal}
                    open={open}
                    title="Bạn có chắc muốn xóa màu này?"
                />
            </div>
        </div>
    );
};

export default ListColor;
