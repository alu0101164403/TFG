'client';

import { AuthContext } from '@/context/auth.context';
import requestServices from '@/services/request.services';
import { useState, useContext } from 'react'


export default function FormComponent({ isOpen, onClose }) {
  const {user} = useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    precio: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    const data = {
      owner: {id: user.id, username: user.username},
      type: 'offer',
      title: formData.title,
      description: formData.description,
      category: 'sc',
      price: parseInt(formData.precio, 10),
    };
    requestServices.saveRequest(data).then( () => {
      onClose();
    }).catch(_err => {
      console.log(_err);
    });
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
      <div className="bg-white rounded-lg p-6 w-80">
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
  );
}