import React from 'react';
import './warningModal.css';

const WarningModal = ({ isOpen, onConfirm, onCancel, message }) => {
    if (!isOpen) return null;

    return (
        <div className="warningModalBackdrop">
            <div className="warningModalContent">
                <p>{message}</p>
                <div className="warningModalButtons">
                    <button className="confirmButton" onClick={onConfirm}>Confirm</button>
                    <button className="cancelButton" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default WarningModal;
