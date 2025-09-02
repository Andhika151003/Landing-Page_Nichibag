// src/Admin-frontend/Dashboad.jsx
import React from "react";
import { Package, PlusCircle, FilePenLine, Trash2 } from "lucide-react";

// Komponen-komponen ini kita letakkan di sini agar file tetap rapi
const StatCard = ({ title, value, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
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
  if (status === "Published") {
    return <span className={`${baseClasses} bg-green-100 text-green-800`}>Published</span>;
  }
  return <span className={`${baseClasses} bg-amber-100 text-amber-800`}>Draft</span>;
};


const Dashboard = () => {
    // Data dummy untuk contoh tampilan
    const collections = [
        { id: 1, name: "Paper Bag", type: "Paper Bag", status: "Published", date: "2023-08-15" },
        { id: 2, name: "Packaging Box", type: "Packaging Box", status: "Published", date: "2023-08-15" },
    ];
    const totalCollections = 5;
    const publishedCount = 4;
    const draftCount = 1;

    return (
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-500 mt-1">Selamat datang kembali, Admin!</p>
            </div>
          </div>

          {/* Statistik */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <StatCard title="Total Koleksi" value={totalCollections} color="bg-rose-500" />
            <StatCard title="Dipublikasikan" value={publishedCount} color="bg-green-500" />
            <StatCard title="Draf" value={draftCount} color="bg-amber-500" />
          </section>

          {/* Tabel Contoh */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Koleksi Terbaru</h2>
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-100 text-left text-gray-600 font-medium">
                        <tr>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Type</th>
                            <th className="px-6 py-4">Status</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {collections.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50 transition">
                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{item.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-600">{item.type}</td>
                            <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={item.status} /></td>
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