import React, { useState } from 'react';

const WarningModal = ({isOpen, message, onClose}) => {
  if (!isOpen || !message) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-100 border border-gray-300">
        <p className="text-xl font-bold mb-4">{message}</p>
        <button
          type="button"
          onClick={onClose}
          className="ml-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
        Cancelar
        </button>
        <button
            type="button"
            onClick={onClose}
            className="ml-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default WarningModal;