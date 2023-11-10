import React from 'react';
import CustomInput from '../components/CustomInput';

const ResetPassword = () => {
    return (
        <div className="py-5" style={{ background: '#1677ff', minHeight: '100vh' }}>
            <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
                <h3 className="text-center">Đổi Mật Khẩu</h3>
                <p className="text-center">Hãy nhập mật khẩu mới bạn mong muốn</p>
                <form action="">
                    <CustomInput type="password" label="Mật Khẩu Mới" id="newPassword" className />
                    <CustomInput type="password" label="Xác Nhận Mật Khẩu" id="confirmPassword" className />
                    <button
                        className="border-0 px-3 py-2 text-white fw-bold w-100"
                        style={{ background: '#1677ff' }}
                        type="submit"
                    >
                        Xác Nhận
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
