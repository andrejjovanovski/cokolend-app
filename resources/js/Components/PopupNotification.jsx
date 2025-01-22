import React from 'react';

const PopupNotification = ({ message, onClose }) => {
    return (
        <div className="fixed top-5 right-5 p-4 bg-white rounded-md shadow-lg flex items-center space-x-4 z-50">
            <span className="font-medium">{message}</span>
            <button onClick={onClose} className="text-white hover:text-gray-200">
                ✖
            </button>
        </div>
    );
};

export default PopupNotification;
