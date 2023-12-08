import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getProducts } from '../features/product/productSlice';
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
        title: 'Tên SP',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
    },
    {
        title: 'Ảnh',
        dataIndex: 'image',
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
    const [open, setOpen] = useState(false);
    const [prodId, setProdId] = useState('');
    const showModal = (id) => {
        setOpen(true);
        setProdId(id);
    };
    const hideModal = () => {
        setOpen(false);
    };
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
            image: productState[i].images.map((item, index) => (
                <img key={index} src={item.url} alt="" width={100} height={100} />
            )),
            brand: productState[i].brand.name,
            category: productState[i].category.name,
            color: (
                <ul className="list-group list-group-flush">
                    {productState[i].color.map((item, index) => (
                        <li key={index} className="list-group-item">
                            <div style={{ width: '30px', height: '30px', background: `${item.name}` }}></div>
                        </li>
                    ))}
                </ul>
            ),
            price: `${productState[i].price}`,
            action: (
                <div className="d-flex gap-15">
                    <Link className="text-warning" to={`/admin/product/${productState[i]._id}`}>
                        <BiEdit className="icon-action" />
                    </Link>
                    <button
                        className="text-danger bg-transparent border-0"
                        to="/"
                        onClick={() => showModal(productState[i]._id)}
                    >
                        <FiDelete className="icon-action" />
                    </button>
                </div>
            ),
        });
    }

    const handelDelProd = (id) => {
        dispatch(deleteProduct(id));
        setOpen(false);
        setTimeout(() => {
            dispatch(getProducts());
        }, 100);
    };
    return (
        <div className="content-wrapper bg-white p-4">
            <h2 className="mb-4">Sản Phẩm</h2>
            <div>
                <Table columns={columns} dataSource={data1} />
                <CustomModal
                    title="Bạn muốn xóa sản phẩm này?"
                    hideModal={hideModal}
                    open={open}
                    performAction={() => handelDelProd(prodId)}
                />
            </div>
        </div>
    );
};

export default ListProduct;
