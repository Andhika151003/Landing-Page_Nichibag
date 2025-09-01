import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // 👈 Import Swal
import withReactContent from "sweetalert2-react-content"; // 👈 Import withReactContent
import {
  LayoutDashboard,
  Package,
  FileText,
  CircleUser,
  Phone,
  PlusCircle,
  FilePenLine,
  Trash2,
  PanelLeft,
  Box,
  LogOut,
} from "lucide-react";

const MySwal = withReactContent(Swal); // 👈 Buat instance MySwal

// Ganti dengan Link dari react-router-dom kalau sudah pakai routing
const Link = ({ to, children, className }) => (
  <a href={to} className={className}>
    {children}
  </a>
);

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const sidebarRef = useRef(null);
  const toggleButtonRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);
  
  // 👇 FUNGSI LOGOUT DENGAN SWEETALERT2
  const handleLogout = () => {
    MySwal.fire({
      title: "Anda Yakin?",
      text: "Anda akan keluar dari sesi admin.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, logout!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        // Jika user mengklik "Ya, logout!"
        console.log("Logout berhasil");
        navigate("/"); // Redirect ke halaman login
      }
    });
  };

  const collections = [
    { id: 1, name: "Paper Bag", type: "Paper Bag", status: "Published", date: "2023-08-15" },
    { id: 2, name: "Packaging Box", type: "Packaging Box", status: "Published", date: "2023-08-15" },
    { id: 3, name: "Gift Box", type: "Gift Box", status: "Published", date: "2023-08-15" },
    { id: 4, name: "Custom Box", type: "Packaging Box", status: "Draft", date: "2023-08-15" },
    { id: 5, name: "Custom Bag", type: "Paper Bag", status: "Draft", date: "2023-08-15" },
  ];

  const totalCollections = collections.length;
  const publishedCount = collections.filter((c) => c.status === "Published").length;
  const draftCount = collections.filter((c) => c.status === "Draft").length;

  const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/kelola-koleksi", icon: Package, label: "Kelola Koleksi" },
    { href: "/kelola-produk", icon: FileText, label: "Kelola Product Detail" },
    { href: "/kelola-about", icon: CircleUser, label: "Kelola About" },
    { href: "/kelola-contact", icon: Phone, label: "Kelola Contact Us" },
  ];

  const currentPage = "/dashboard";

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`bg-white border-r flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div
          className={`h-[68px] flex items-center border-b px-4 ${
            isSidebarOpen ? "justify-between" : "justify-center"
          }`}
        >
          <div
            className={`flex items-center gap-2 overflow-hidden transition-all duration-300 ${
              isSidebarOpen ? "w-auto opacity-100" : "w-0 opacity-0"
            }`}
          >
            <div className="w-8 h-8 flex items-center justify-center bg-rose-100 text-rose-700 rounded-lg">
              <Box className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-rose-700 whitespace-nowrap">AdminPanel</h2>
          </div>

          <button
            ref={toggleButtonRef}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title="Toggle Sidebar"
          >
            <PanelLeft
              className={`w-6 h-6 text-gray-700 transition-transform duration-300 ${
                !isSidebarOpen && "rotate-180"
              }`}
            />
          </button>
        </div>

        <nav className="flex-1 flex flex-col justify-between p-4 w-full">
          <div>
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`flex items-center py-2.5 rounded-lg transition-colors text-sm font-medium mb-2 ${
                  currentPage === item.href
                    ? "bg-rose-100 text-rose-800"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                } ${isSidebarOpen ? "px-4" : "justify-center"}`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span
                  className={`overflow-hidden whitespace-nowrap transition-all duration-200 ${
                    isSidebarOpen ? "w-full ml-3" : "w-0"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

          <div>
            <button
              onClick={handleLogout}
              className={`flex items-center w-full py-2.5 rounded-lg transition-colors text-sm font-medium text-red-600 hover:bg-red-100 hover:text-red-800 ${
                isSidebarOpen ? "px-4" : "justify-center"
              }`}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              <span
                className={`overflow-hidden whitespace-nowrap transition-all duration-200 ${
                  isSidebarOpen ? "w-full ml-3" : "w-0"
                }`}
              >
                Logout
              </span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto transition-all duration-300 ease-in-out">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-500 mt-1">Selamat datang kembali, Rizky!</p>
            </div>
            <button className="flex items-center gap-2 bg-rose-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-rose-800 transition-all">
              <PlusCircle className="w-5 h-5" />
              Tambah Koleksi
            </button>
          </div>

          {/* Statistik */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <StatCard title="Total Koleksi" value={totalCollections} color="bg-rose-500" />
            <StatCard title="Dipublikasikan" value={publishedCount} color="bg-green-500" />
            <StatCard title="Draf" value={draftCount} color="bg-amber-500" />
          </section>

          {/* Tabel Koleksi */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Semua Koleksi</h2>
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-100 text-left text-gray-600 font-medium">
                    <tr>
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Type</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Last Updated</th>
                      <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {collections.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">{item.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={item.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">{item.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex justify-center items-center gap-4">
                            <button className="text-blue-600 hover:text-blue-800 transition-colors">
                              <FilePenLine className="w-5 h-5" />
                            </button>
                            <button className="text-red-600 hover:text-red-800 transition-colors">
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

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

export default Dashboard;