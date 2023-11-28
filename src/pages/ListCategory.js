import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategory, getCategories } from '../features/category/categorySlice';
import moment from 'moment';
import CustomModal from '../components/CustomModal';

import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { FiDelete } from 'react-icons/fi';
const columns = [
    {
        title: 'STT',
        dataIndex: 'key',
    },
    {
        title: 'Danh mục',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'createdAt',
    },
    {
        title: 'Ngày cập nhật',
        dataIndex: 'updatedAt',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];

const ListCategory = () => {
    const [open, setOpen] = useState(false);
    const [catId, setCatId] = useState('');
    const showModal = (id) => {
        setOpen(true);
        setCatId(id);
    };
    const hideModal = () => {
        setOpen(false);
    };
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);
    const categoryState = useSelector((state) => state.category.categories);
    console.log(categoryState);
    const data1 = [];
    for (let i = 0; i < categoryState.length; i++) {
        data1.push({
            key: i + 1,
            name: categoryState[i].name,
            createdAt: moment(categoryState[i].createdAt).format('DD/MM/YYYY'),
            updatedAt: moment(categoryState[i].updatedAt).format('DD/MM/YYYY'),
            action: (
                <div className="d-flex gap-10">
                    <Link className=" fs-5 text-warning" to={`/admin/category/${categoryState[i]._id}`}>
                        <BiEdit />
                    </Link>
                    <button
                        className=" fs-5 text-danger bg-transparent border-0"
                        onClick={() => showModal(categoryState[i]._id)}
                    >
                        <FiDelete />
                    </button>
                </div>
            ),
        });
    }
    const handleDelCategory = (id) => {
        dispatch(deleteCategory(id));
        setOpen(false);
        setTimeout(() => {
            dispatch(getCategories());
        }, 100);
    };
    return (
        <div>
            <h3 className="mb-4">Danh Mục</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
                <CustomModal
                    open={open}
                    hideModal={hideModal}
                    performAction={() => handleDelCategory(catId)}
                    title="Bạn muốn xóa danh mục này?"
                />
            </div>
        </div>
    );
};

export default ListCategory;
