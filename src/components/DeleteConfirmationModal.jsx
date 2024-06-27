import { Modal, Button } from 'antd';

const DeleteConfirmationModal = ({ open, onConfirm, onCancel }) => {
    return (
        <Modal
            open={open}
            title="Confirm Deletion"
            onCancel={onCancel}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    Cancel
                </Button>,
                <Button key="delete" type="primary" danger onClick={onConfirm}>
                    Delete
                </Button>,
            ]}
        >
            <p>Are you sure you want to delete this record?</p>
        </Modal>
    );
};

export default DeleteConfirmationModal;
