import React from 'react';
import { Table } from 'antd';
const columns = [
    {
        title: 'Sno',
        dataIndex: 'key',
    },
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Product',
        dataIndex: 'product',
    },
    {
        title: 'Status',
        dataIndex: 'status',
    },
];
const data1 = [];
for (let i = 0; i < 46; i++) {
    data1.push({
        key: i,
        name: `Bui Bach ${i}`,
        product: 32,
        status: `Ha Noi, Thanh Xuan ${i}`,
    });
}
const ListCategory = () => {
    return (
        <div>
            <h3 className="mb-4">Đơn Hàng</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    );
};

export default ListCategory;
