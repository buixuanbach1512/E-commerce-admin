import React, { useState } from 'react';
import CustomInput from '../components/CustomInput';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddProduct = () => {
    const [desc, setDesc] = useState('');
    const handleDesc = (e) => {
        setDesc(e);
    };
    return (
        <div>
            <h3 className="mb-4">Thêm Sản Phẩm</h3>
            <div>
                <form action="">
                    <CustomInput type="text" label="Nhập tên sản phẩm ..." />
                    <CustomInput type="number" label="Nhập giá sản phẩm ..." />
                    <select name="" id="" className="form-control py-3 mb-3" style={{ fontSize: 14 }}>
                        <option value="">Chọn Danh mục</option>
                    </select>
                    <select name="" id="" className="form-control py-3 mb-3" style={{ fontSize: 14 }}>
                        <option value="">Chọn Màu</option>
                    </select>
                    <select name="" id="" className="form-control py-3 mb-3" style={{ fontSize: 14 }}>
                        <option value="">Chọn Thương Hiệu</option>
                    </select>
                    <ReactQuill
                        theme="snow"
                        value={desc}
                        onChange={(evt) => {
                            handleDesc(evt);
                        }}
                    />
                    <input type="file" className="form-control" />
                    <button type="submit" className="btn btn-success border-0 rounded-3 my-5">
                        Thêm Sản Phẩm
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
