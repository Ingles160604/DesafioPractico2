import React from 'react';

const ProductRow = ({ product, onEdit, onDelete }) => {
  const { id, title, price, description, image } = product;

  return (
    <tr>
      <td className="border p-2">{id}</td>
      <td className="border p-2">{title}</td>
      <td className="border p-2">{price}</td>
      <td className="border p-2">{description}</td>
      <td className="border p-2">
        <img src={image} alt={title} className="w-16 h-16" />
      </td>
      <td className="border p-2">
        <button className="bg-blue-500 text-white p-2" onClick={onEdit}>
          Editar
        </button>
        <button className="bg-red-500 text-white p-2 my-2" onClick={onDelete}>
          Borrar
        </button>
      </td>
    </tr>
  );
};

export default ProductRow;
