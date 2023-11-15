import React from 'react';
import ProductRow from './ProductRow';

const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <table className="min-w-full border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2">ID</th>
          <th className="border p-2">Nombre</th>
          <th className="border p-2">Precio</th>
          <th className="border p-2">Descripcion</th>
          <th className="border p-2">Imagen</th>
          <th className="border p-2">Accion</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <ProductRow
            key={product.id}
            product={product}
            onEdit={() => onEdit(product)}
            onDelete={() => onDelete(product.id)}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;

