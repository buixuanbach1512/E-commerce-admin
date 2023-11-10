import React from 'react';
import CustomInput from '../components/CustomInput';

const AddBrand = () => {
    return (
        <div>
            <h3 className="mb-4">Thêm Thương Hiệu Sản Phẩm</h3>
            <div>
                <form action="">
                    <CustomInput type="text" label="Nhập tên thương hiệu ..." i_class="w-50" />
                    <button type="submit" className="btn btn-success border-0 rounded-3 my-5">
                        Thêm Mới
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddBrand;
