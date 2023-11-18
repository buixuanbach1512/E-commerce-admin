import React from 'react';
import CustomInput from '../components/CustomInput';

const AddCat = () => {
    return (
        <div>
            <h3 className="mb-4">Thêm Danh Mục Sản Phẩm</h3>
            <div>
                <form action="">
                    <CustomInput type="text" label="Nhập danh mục sản phẩm ..." />
                    <button type="submit" className="btn btn-success border-0 rounded-3 my-5">
                        Thêm Mới
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCat;
