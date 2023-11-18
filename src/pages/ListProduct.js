import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../features/product/productSlice';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { FiDelete } from 'react-icons/fi';
const columns = [
    {
        title: 'STT',
        dataIndex: 'key',
    },
    {
        title: 'Tên sản phẩm',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
    },
    {
        title: 'Thương Hiệu',
        dataIndex: 'brand',
        sorter: (a, b) => a.brand.length - b.brand.length,
    },
    {
        title: 'Danh mục',
        dataIndex: 'category',
        sorter: (a, b) => a.category.length - b.category.length,
    },
    {
        title: 'Màu sắc',
        dataIndex: 'color',
    },
    {
        title: 'Giá tiền',
        dataIndex: 'price',
        sorter: (a, b) => a.price.length - b.price.length,
    },
    {
        title: 'Hành động',
        dataIndex: 'action',
    },
];

const ListProduct = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);
    const productState = useSelector((state) => state.product.products);
    const data1 = [];
    for (let i = 0; i < productState.length; i++) {
        data1.push({
            key: i + 1,
            name: productState[i].name,
            brand: productState[i].brand,
            category: productState[i].category,
            color: productState[i].color,
            price: `${productState[i].price}`,
            action: (
                <div className="d-flex gap-15">
                    <Link className=" fs-5 text-warning" to="/">
                        <BiEdit />
                    </Link>
                    <Link className="ms-3 fs-5 text-danger" to="/">
                        <FiDelete />
                    </Link>
                </div>
            ),
        });
    }
    return (
        <div>
            <h3 className="mb-4">Sản Phẩm</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    );
};

export default ListProduct;
