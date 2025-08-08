import React, { useState, useEffect } from "react";
import axios from "axios";

const EditProduct = ({ productId }) => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    images: [],
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/${productId}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setProduct({ ...product, images: files });
  };

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("category", product.category);

    product.images.forEach((img) => {
      formData.append("images", img);
    });

    axios
      .put(`http://localhost:5000/products/${productId}`, formData)
      .then(() => alert("Produk berhasil diperbarui"))
      .catch((err) => console.error(err));
  };

  const handleDelete = () => {
    if (window.confirm("Yakin ingin menghapus produk ini?")) {
      axios
        .delete(`http://localhost:5000/products/${productId}`)
        .then(() => alert("Produk berhasil dihapus"))
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-1">Edit Product Details</h2>
        <p className="text-sm text-pink-500 mb-6">
          Modify the product information below.
        </p>

        <div className="space-y-4">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Enter product name"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Product Description
            </label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Enter product description"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Enter price"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Enter category"
            />
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Product Images
            </label>
            <input
              type="file"
              multiple
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                         file:rounded-full file:border-0
                         file:text-sm file:font-semibold
                         file:bg-pink-50 file:text-pink-600
                         hover:file:bg-pink-100"
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
              {product.images &&
                product.images.map((img, i) => (
                  <img
                    key={i}
                    src={
                      typeof img === "string"
                        ? img
                        : URL.createObjectURL(img)
                    }
                    alt="product"
                    className="w-full h-auto rounded-lg border"
                  />
                ))}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button
            onClick={handleUpdate}
            className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-lg transition"
          >
            Update Product
          </button>
          <button
            onClick={handleDelete}
            className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-black font-medium rounded-lg transition"
          >
            Delete Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
