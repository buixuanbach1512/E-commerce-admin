import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

// icon
import {
    AiOutlineDashboard,
    AiOutlineShoppingCart,
    AiOutlineUser,
    AiOutlinePicLeft,
    AiOutlinePicRight,
} from 'react-icons/ai';
import { BiCategory, BiSolidColorFill } from 'react-icons/bi';
import { SiBrandfolder } from 'react-icons/si';
import { FaClipboardList } from 'react-icons/fa';
import { RiCoupon3Fill } from 'react-icons/ri';

// antd
import { Layout, Menu, Button, theme } from 'antd';

// react toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Header, Sider, Content } = Layout;
const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
    }, []);
    useEffect(() => {
        if (width <= 740) {
            setCollapsed(true);
        } else {
            setCollapsed(false);
        }
    }, [width]);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const navigate = useNavigate();
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo">
                    <h2 className="text-white text-center fs-5 py-3">
                        <span className="sm-logo">BS</span>
                        <span className="lg-logo">B SHOP</span>
                    </h2>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['']}
                    onClick={({ key }) => {
                        if (key === 'signout') {
                        } else {
                            navigate(key);
                        }
                    }}
                    items={[
                        {
                            key: '',
                            icon: <AiOutlineDashboard className="fs-6" />,
                            label: 'Dash Board',
                        },
                        {
                            key: 'customers',
                            icon: <AiOutlineUser className="fs-6" />,
                            label: 'Khách Hàng',
                        },
                        {
                            key: 'categories',
                            icon: <BiCategory className="fs-6" />,
                            label: 'Danh Mục',
                            children: [
                                {
                                    key: 'category',
                                    icon: <BiCategory className="fs-6" />,
                                    label: 'Thêm Mới',
                                },
                                {
                                    key: 'listcategory',
                                    icon: <BiCategory className="fs-6" />,
                                    label: 'Thống Kê',
                                },
                            ],
                        },
                        {
                            key: 'products',
                            icon: <AiOutlineShoppingCart className="fs-6" />,
                            label: 'Sản Phẩm',
                            children: [
                                {
                                    key: 'product',
                                    icon: <AiOutlineShoppingCart className="fs-6" />,
                                    label: 'Thêm Mới',
                                },
                                {
                                    key: 'listproduct',
                                    icon: <AiOutlineShoppingCart className="fs-6" />,
                                    label: 'Thống Kê',
                                },
                            ],
                        },
                        {
                            key: 'brands',
                            icon: <SiBrandfolder className="fs-6" />,
                            label: 'Thương Hiệu',
                            children: [
                                {
                                    key: 'brand',
                                    icon: <SiBrandfolder className="fs-6" />,
                                    label: 'Thêm Mới',
                                },
                                {
                                    key: 'listbrand',
                                    icon: <SiBrandfolder className="fs-6" />,
                                    label: 'Thống Kê',
                                },
                            ],
                        },
                        {
                            key: 'colors',
                            icon: <BiSolidColorFill className="fs-6" />,
                            label: 'Màu Sắc',
                            children: [
                                {
                                    key: 'color',
                                    icon: <BiSolidColorFill className="fs-6" />,
                                    label: 'Thêm Mới',
                                },
                                {
                                    key: 'listcolor',
                                    icon: <BiSolidColorFill className="fs-6" />,
                                    label: 'Thống Kê',
                                },
                            ],
                        },
                        {
                            key: 'coupons',
                            icon: <RiCoupon3Fill className="fs-6" />,
                            label: 'Phiếu giảm giá',
                            children: [
                                {
                                    key: 'coupon',
                                    icon: <RiCoupon3Fill className="fs-6" />,
                                    label: 'Thêm mới',
                                },
                                {
                                    key: 'listcoupon',
                                    icon: <RiCoupon3Fill className="fs-6" />,
                                    label: 'Thống Kê',
                                },
                            ],
                        },
                        {
                            key: 'orders',
                            icon: <FaClipboardList className="fs-6" />,
                            label: 'Đơn Hàng',
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    className="d-flex justify-content-between ps-1 pe-5"
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        className="btn-lr"
                        icon={collapsed ? <AiOutlinePicRight /> : <AiOutlinePicLeft />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <div className="d-flex gap-3 align-items-center">
                        <div className="d-flex gap-3 align-items-center">
                            <div>
                                <img style={{ width: '35px', height: '35px' }} src="images/logo.jpg" alt="" />
                            </div>
                            <div>
                                <h5 className="mb-0">Admin</h5>
                                <p className="mb-0">admin@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    <ToastContainer
                        position="top-right"
                        autoClose={1000}
                        hideProgressBar={false}
                        newestOnTop={true}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        theme="light"
                    />
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};
export default MainLayout;
