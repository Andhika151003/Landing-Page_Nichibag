// src/Admin-frontend/Dashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Package, Trash2 } from "lucide-react";
import Swal from 'sweetalert2';

const StatCard = ({ title, value, color }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
      <Package className="w-6 h-6 text-white" />
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  const baseClasses = "px-3 py-1 rounded-full text-xs font-semibold inline-block";
  if (status === "success") {
    return <span className={`${baseClasses} bg-green-100 text-green-800`}>Success</span>;
  }
  return <span className={`${baseClasses} bg-red-100 text-red-800`}>Failed</span>;
};

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalLogs: 0,
    createCount: 0,
    updateCount: 0,
    deleteCount: 0,
  });
  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/logs"); // ambil log dari backend
      const data = res.data;

      // Hitung statistik
      const totalLogs = data.length;
      const createCount = data.filter((l) => l.action === "create").length;
      const updateCount = data.filter((l) => l.action === "update").length;
      const deleteCount = data.filter((l) => l.action === "delete").length;

      setStats({ totalLogs, createCount, updateCount, deleteCount });
      setLogs(data);
    } catch (error) {
      console.error("Gagal memuat log dashboard:", error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleResetLogs = () => {
    Swal.fire({
      title: 'Anda Yakin?',
      text: "Semua data log aktivitas akan dihapus permanen!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, hapus semua!',
      cancelButtonText: 'Batal'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete("http://localhost:5000/logs/reset");
          Swal.fire(
            'Terhapus!',
            'Log aktivitas berhasil direset.',
            'success'
          );
          fetchLogs(); // Ambil data log lagi setelah reset
        } catch (error) {
          Swal.fire(
            'Gagal!',
            'Gagal mereset log aktivitas.',
            'error'
          );
          console.error("Gagal mereset log:", error);
        }
      }
    })
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Selamat datang kembali, Admin!</p>
        </div>
        <button
          onClick={handleResetLogs}
          className="bg-red-500 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600 transition-all duration-300"
        >
          <Trash2 size={18} />
          Reset Log
        </button>
      </div>

      

      {/* Statistik */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Activity" value={stats.totalLogs} color="bg-rose-500" />
        <StatCard title="Created" value={stats.createCount} color="bg-green-500" />
        <StatCard title="Updated" value={stats.updateCount} color="bg-blue-500" />
        <StatCard title="Deleted" value={stats.deleteCount} color="bg-amber-500" />
      </section>

      {/* Tabel Log Activity */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Log Activity</h2>
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-left text-gray-600 font-medium">
                <tr>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Action</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {logs.map((log) => (
                  <tr key={log._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{log.user}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{log.action}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{log.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={log.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
