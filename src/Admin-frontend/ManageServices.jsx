// src/Admin-frontend/ManageServices.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { PlusCircle, Edit, Trash2 } from "lucide-react";

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentService, setCurrentService] = useState({ name: "", description: "", icon: "" });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/services");
      setServices(res.data);
    } catch (error) {
      console.error("Gagal mengambil data layanan:", error);
    }
  };

  const handleOpenModal = (service = null) => {
    if (service) {
      setIsEditing(true);
      setCurrentService(service);
    } else {
      setIsEditing(false);
      setCurrentService({ name: "", description: "", icon: "" });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentService({ ...currentService, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/services/${currentService._id}`, currentService);
        Swal.fire("Sukses!", "Layanan berhasil diperbarui.", "success");
      } else {
        await axios.post("http://localhost:5000/services", currentService);
        Swal.fire("Sukses!", "Layanan berhasil ditambahkan.", "success");
      }
      fetchServices();
      handleCloseModal();
    } catch (error) {
      Swal.fire("Error", "Gagal menyimpan layanan.", "error");
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Anda Yakin?',
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/services/${id}`);
          Swal.fire('Terhapus!', 'Layanan berhasil dihapus.', 'success');
          fetchServices();
        } catch (error) {
          Swal.fire("Error", "Gagal menghapus layanan.", "error");
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Kelola Layanan</h1>
        <button
          onClick={() => handleOpenModal()}
          className="bg-pink-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-pink-600 transition"
        >
          <PlusCircle size={20} /> Tambah Layanan
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left font-semibold">Ikon</th>
              <th className="px-6 py-3 text-left font-semibold">Nama Layanan</th>
              <th className="px-6 py-3 text-left font-semibold">Deskripsi</th>
              <th className="px-6 py-3 text-center font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-2xl">{service.icon}</td>
                <td className="px-6 py-4 font-medium">{service.name}</td>
                <td className="px-6 py-4 text-gray-600">{service.description}</td>
                <td className="px-6 py-4 flex justify-center gap-4">
                  <button onClick={() => handleOpenModal(service)} className="text-blue-500 hover:text-blue-700"><Edit size={20} /></button>
                  <button onClick={() => handleDelete(service._id)} className="text-red-500 hover:text-red-700"><Trash2 size={20} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-6">{isEditing ? 'Edit Layanan' : 'Tambah Layanan Baru'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="icon" value={currentService.icon} onChange={handleChange} placeholder="Ikon (Emoji)" className="w-full p-3 border rounded-lg" />
              <input type="text" name="name" value={currentService.name} onChange={handleChange} placeholder="Nama Layanan" className="w-full p-3 border rounded-lg" required />
              <textarea name="description" value={currentService.description} onChange={handleChange} placeholder="Deskripsi Layanan" className="w-full p-3 border rounded-lg" rows="3" required />
              <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={handleCloseModal} className="px-6 py-2 bg-gray-300 rounded-lg font-semibold">Batal</button>
                <button type="submit" className="px-6 py-2 bg-pink-500 text-white rounded-lg font-semibold">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageServices;