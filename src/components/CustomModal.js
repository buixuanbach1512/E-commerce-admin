import React from 'react';
import { Modal } from 'antd';

const CustomModal = (props) => {
    const { title, open, hideModal, performAction } = props;
    return (
        <Modal title="Modal" open={open} onOk={performAction} onCancel={hideModal} okText="Đồng ý" cancelText="Hủy">
            <p>{title}</p>
        </Modal>
    );
};

export default CustomModal;
