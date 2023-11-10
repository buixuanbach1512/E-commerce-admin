import React from 'react';
import CustomInput from '../components/CustomInput';

const AddColor = () => {
    return (
        <div>
            <h3 className="mb-4">Thêm Màu Sản Phẩm</h3>
            <div>
                <form action="">
                    <CustomInput type="color" label="Nhập màu sản phẩm ..." i_class="w-25" />
                    <button type="submit" className="btn btn-success border-0 rounded-3 my-5">
                        Thêm Mới
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddColor;
