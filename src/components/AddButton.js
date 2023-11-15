import React from 'react';

const AddButton = ({ onClick }) => {
  return (
    <button className="bg-green-500 text-white p-2 my-3" onClick={onClick}>
      Añadir producto
    </button>
  );
};

export default AddButton;
