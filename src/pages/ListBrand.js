import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBrand, getBrands, resetState } from '../features/brand/brandSlice';
import moment from 'moment';
import { Table } from 'antd';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { FiDelete } from 'react-icons/fi';
import CustomModal from '../components/CustomModal';
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
        title: 'Ngày tạo',
        dataIndex: 'createdAt',
    },
    {
        title: 'Ngày cập nhật',
        dataIndex: 'updatedAt',
    },
    {
        title: 'Hành động',
        dataIndex: 'action',
    },
];

const ListBrand = () => {
    const [open, setOpen] = useState(false);
    const [brandId, setBrandId] = useState('');
    const showModal = (e) => {
        setOpen(true);
        setBrandId(e);
    };
    const hideModal = () => {
        setOpen(false);
    };
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(resetState());
        dispatch(getBrands());
    }, [dispatch]);
    const brandState = useSelector((state) => state.brand.brands);
    const data1 = [];
    for (let i = 0; i < brandState.length; i++) {
        data1.push({
            key: i + 1,
            name: brandState[i].name,
            createdAt: moment(brandState[i].createdAt).format('DD/MM/YYYY'),
            updatedAt: moment(brandState[i].updatedAt).format('DD/MM/YYYY'),
            action: (
                <div className="d-flex gap-10">
                    <Link to={`/admin/brand/${brandState[i]._id}`} className=" text-warning">
                        <BiEdit className="icon-action" />
                    </Link>
                    <button
                        className="text-danger bg-transparent border-0"
                        onClick={() => showModal(brandState[i]._id)}
                    >
                        <FiDelete className=" icon-action" />
                    </button>
                </div>
            ),
        });
    }
    const handleDelBrand = (id) => {
        dispatch(deleteBrand(id));
        setOpen(false);
        setTimeout(() => {
            dispatch(getBrands());
        }, 100);
    };
    return (
        <div className="content-wrapper bg-white p-4">
            <h2 className="mb-4">Thương Hiệu</h2>
            <div>
                <Table columns={columns} dataSource={data1} />
                <CustomModal
                    performAction={() => handleDelBrand(brandId)}
                    hideModal={hideModal}
                    open={open}
                    title="Bạn có chắc muốn xóa thương hiệu này?"
                />
            </div>
        </div>
    );
};

export default ListBrand;
