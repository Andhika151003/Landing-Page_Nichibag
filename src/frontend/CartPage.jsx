// src/frontend/CartPage.jsx
import React from "react";
import { useCart } from "../context/CartContext";
// Pastikan MessageCircle diimport untuk ikon WhatsApp
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, MessageCircle } from "lucide-react"; 
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  const handleDeleteItem = (id, colorName) => {
    Swal.fire({
      title: "Hapus Item?",
      text: "Barang ini akan dihapus dari keranjangmu.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(id, colorName);
        Swal.fire({
          title: "Terhapus!",
          text: "Item berhasil dihapus.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  const handleCheckout = () => {
    const phoneNumber = "6287788261298";
    let message = "Halo Nichibag, saya ingin memesan produk berikut:\n\n";
    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.name}* \n`;
      message += `  - Kode Produk: ${item.productCode || "Tidak Ada Kode"}\n`;
      message += `  - Warna: ${item.selectedColor?.name || "-"}\n`;
      message += `  - Jumlah: ${item.quantity}\n`;
      message += `  - Harga: Rp${(
        item.discountPrice || item.price
      ).toLocaleString("id-ID")}\n\n`;
    });

    message += `*Total Pembayaran: Rp${getTotalPrice().toLocaleString(
      "id-ID"
    )}*\n\n`;
    message +=
      "Mohon konfirmasi ketersediaan stok dan total pembayaran akhir. Terima kasih!";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#F9F6EE] pt-32 px-4 flex flex-col items-center justify-center text-center">
        <ShoppingBag size={64} className="text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-red-700">
          Keranjang Belanjamu Kosong
        </h2>
        <p className="text-gray-500 mb-8">
          Yuk isi dengan kemasan cantik dari Nichibag!
        </p>
        <Link
          to="/katalog"
          className="bg-red-700 text-white px-6 py-3 rounded-full font-bold hover:bg-red-800 transition"
        >
          Mulai Belanja
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F6EE] pt-28 pb-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Link
            to="/katalog"
            className="text-red-600 hover:text-red-700 flex items-center gap-2 font-medium w-fit"
          >
            <ArrowLeft size={18} /> Kembali ke Katalog
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-red-700 mb-8 flex items-center gap-3">
          <ShoppingBag /> Keranjang Belanja
        </h1>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* List Produk */}
          <div className="flex-1 space-y-4">
            {cart.map((item) => (
              <motion.div
                key={`${item._id}-${item.selectedColor?.name}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 items-center"
              >
                <img
                  src={`http://127.0.0.1:5000${
                    item.selectedColor?.imageUrls?.[0] ||
                    item.colors?.[0]?.imageUrls?.[0]
                  }`}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-red-700 text-lg line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-sm text-red-700">
                    Kode:{" "}
                    <span className="font-medium text-red-700">
                      {item.productCode || "N/A"}
                    </span>{" "}
                    | Warna:{" "}
                    <span className="font-medium text-red-700">
                      {item.selectedColor?.name}
                    </span>
                  </p>
                  <p className="text-red-700 font-bold mt-1">
                    Rp
                    {(item.discountPrice || item.price).toLocaleString(
                      "id-ID"
                    )}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <button
                    onClick={() =>
                      handleDeleteItem(item._id, item.selectedColor?.name)
                    }
                    className="text-gray-400 hover:text-red-700 transition-colors"
                    title="Hapus Item"
                  >
                    <Trash2 size={20} />
                  </button>
                  <div className="flex items-center bg-[#f8d7d0] shadow-sm rounded-full px-2 py-1 gap-1">
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.selectedColor?.name, -1)
                      }
                      className="p-1 text-red-700 hover:bg-white/50 rounded-full transition-all active:scale-90"
                    >
                      <Minus size={16} strokeWidth={2.5} />
                    </button>
                    <span className="font-extrabold text-sm w-6 text-center text-red-700 select-none">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.selectedColor?.name, 1)
                      }
                      className="p-1 text-red-700 hover:bg-white/50 rounded-full transition-all active:scale-90"
                    >
                      <Plus size={16} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Ringkasan Pesanan */}
          <div className="lg:w-96">
            <div className="bg-white p-6 rounded-xl shadow-md sticky top-28 border border-gray-100">
              <h3 className="text-xl font-bold text-red-700 mb-4">
                Ringkasan Pesanan
              </h3>
              <div className="space-y-3 mb-6 text-red-700">
                <div className="flex justify-between text-sm">
                  <span>Total Item</span>
                  <span className="font-medium">
                    {cart.reduce((a, c) => a + c.quantity, 0)} pcs
                  </span>
                </div>
                <div className="border-t border-gray-100 my-2"></div>
                <div className="flex justify-between text-lg font-bold text-red-700">
                  <span>Total Harga</span>
                  <span className="text-red-700">
                    Rp{getTotalPrice().toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
              
              {/* BUTTON DIKEMBALIKAN KE HIJAU */}
              <button
                onClick={handleCheckout}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transform active:scale-95"
              >
                <MessageCircle size={20} />
                Checkout via WhatsApp
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;