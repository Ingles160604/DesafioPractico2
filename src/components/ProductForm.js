import React, { useState } from 'react';

const ProductForm = ({ onSubmit, onCancel, product }) => {
  const [formData, setFormData] = useState(product || {
    id: '',
    title: '',
    price: '',
    description: '',
    image: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          Titulo
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
          Precio
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
          Descripcion
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
          URL de la imagen
        </label>
        <input
          type="text"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      <div className="flex justify-end">
        <button type="submit" className="bg-blue-500 text-white p-2">
          Guardar
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-500 text-white p-2 ml-2">
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
