import React from 'react';
import CustomInput from '../components/CustomInput';

const ForgotPassword = () => {
    return (
        <div className="py-5" style={{ background: '#1677ff', minHeight: '100vh' }}>
            <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
                <h3 className="text-center">Quên Mật Khẩu</h3>
                <p className="text-center">Hãy nhập email đăng ký để nhận mật khẩu mới</p>
                <form action="">
                    <CustomInput type="email" label="Email" id="email" className />
                    <button
                        className="border-0 px-3 py-2 text-white fw-bold w-100"
                        style={{ background: '#1677ff' }}
                        type="submit"
                    >
                        Gửi
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
