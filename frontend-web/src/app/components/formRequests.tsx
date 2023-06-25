"use client";

import { AuthContext } from '@/context/auth.context';
import {RequestService, RequestData} from '@/services/request.services';
import { useState, useContext, useCallback } from 'react'


export default function FormComponent({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const {user} = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    precio: '',
  });

  const handleChange = async (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    console.log('f',formData)
  };

  const handleSubmit = useCallback((event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (user != null) {
      const data: RequestData = {
        owner: {id: user.id, username: user.username},
        type: 'offer',
        title: formData.title,
        description: formData.description,
        category: 'sc',
        price: parseInt(formData.precio, 10),
      };
      RequestService.saveRequest(data).then( () => {
        onClose();
      }).catch(_err => {
        console.log(_err);
      });
    } else {
      console.log('No hay un usuario conectado')
    }
  }, [formData]);

  return (
    <>
    {
      isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-80 border border-gray-300">
            <h2 className="text-2xl font-bold mb-4">Formulario</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block mb-2 text-gray-800">
                  Titulo
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border-gray-300 border p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="precio" className="block mb-2 text-gray-800">
                  Precio
                </label>
                <input
                  type="text"
                  id="precio"
                  name="precio"
                  value={formData.precio}
                  onChange={handleChange}
                  className="w-full border-gray-300 border p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block mb-2 text-gray-800">
                  Descipcion
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border-gray-300 border p-2 rounded"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Enviar
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="ml-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}