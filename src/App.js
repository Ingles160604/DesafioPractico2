import React, { useState, useEffect } from 'react';
import ProductTable from './components/ProductTable';
import ProductForm from './components/ProductForm';
import AddButton from './components/AddButton';
import axios from 'axios';

const App = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    // Recuperar productos almacenados en localStorage al montar el componente
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
  }, []);

  useEffect(() => {
    // Almacenar productos en localStorage cada vez que se actualizan
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  // Cargar productos desde la API al montar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAdd = () => {
    setSelectedProduct(null);
    setIsFormOpen(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = (productId) => {
    setProductToDelete(productId);
    setIsDeleteConfirmationOpen(true);
  };

  const confirmDelete = async () => {
    try {
      // Eliminar producto desde la API
      await axios.delete(`https://fakestoreapi.com/products/${productToDelete}`);
      // Actualizar la lista de productos localmente
      const updatedProducts = products.filter((product) => product.id !== productToDelete);
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error deleting product:', error);
    } finally {
      closeDeleteConfirmation();
    }
  };

  const closeDeleteConfirmation = () => {
    setIsDeleteConfirmationOpen(false);
    setProductToDelete(null);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (selectedProduct) {
        // Actualizar producto existente en la API
        await axios.put(`https://fakestoreapi.com/products/${selectedProduct.id}`, formData);
        // Actualizar la lista de productos localmente
        const updatedProducts = products.map((product) =>
          product.id === selectedProduct.id ? { ...product, ...formData } : product
        );
        setProducts(updatedProducts);
      } else {
        // Agregar nuevo producto a la API
        const response = await axios.post('https://fakestoreapi.com/products', formData);
        // Actualizar la lista de productos localmente
        setProducts([...products, response.data]);
      }

      setIsFormOpen(false);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      {isFormOpen ? (
        <ProductForm
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          product={selectedProduct}
        />
      ) : (
        <>
          <AddButton onClick={handleAdd} />
          <ProductTable products={products} onEdit={handleEdit} onDelete={handleDelete} />
        </>
      )}

      {isDeleteConfirmationOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="p-4 rounded shadow-md bg-black">
            <p className="mb-4 text-white">Estas seguro de eliminar el producto?</p>
            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white p-2"
                onClick={confirmDelete}
              >
                Yes
              </button>
              <button
                className="bg-blue-500 text-white p-2 ml-2"
                onClick={closeDeleteConfirmation}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
