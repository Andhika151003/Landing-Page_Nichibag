import React from "react";
import { Link } from "react-router-dom"; // ganti ke react-router-dom

const Dashboard = () => {
  const collections = [
    {
      name: "Paper Bag",
      type: "Paper Bag",
      status: "Published",
      date: "2023-08-15",
    },
    {
      name: "Packaging Box",
      type: "Packaging Box",
      status: "Published",
      date: "2023-08-15",
    },
    {
      name: "Gift Box",
      type: "Gift Box",
      status: "Published",
      date: "2023-08-15",
    },
    {
      name: "Custom Box",
      type: "Packaging Box",
      status: "Draft",
      date: "2023-08-15",
    },
    {
      name: "Custom Bag",
      type: "Paper Bag",
      status: "Draft",
      date: "2023-08-15",
    },
  ];

  const featured = [
    {
      name: "Paper Bag",
      image: "https://source.unsplash.com/300x300/?paperbag",
    },
    {
      name: "Packaging Box",
      image: "https://source.unsplash.com/300x300/?packaging",
    },
    { name: "Gift Box", image: "https://source.unsplash.com/300x300/?giftbox" },
  ];

  return (
    <div className="flex min-h-screen bg-[#fefcfc] text-[#3a2d2d]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#fff9f9] shadow-md p-6 border-r">
        <h2 className="text-xl font-semibold mb-1">Admin</h2>
        <p className="text-sm text-gray-500 mb-6">
          Selamat Datang Di Panel Admin
        </p>
        <nav className="flex flex-col gap-3">
          <Link
            to="/Dashboard"
            className="bg-[#f3e7e7] px-3 py-2 rounded-md font-medium hover:bg-[#ecdcdc] transition"
          >
            Dashboard
          </Link>
          <Link
            to="/kelola-koleksi" // perbaiki path
            className="px-3 py-2 rounded-md hover:bg-[#ecdcdc] hover:text-[#800000] transition"
          >
            Kelola Koleksi
          </Link>
          <Link
            to="/kelola-produk"
            className="px-3 py-2 rounded-md hover:bg-[#ecdcdc] hover:text-[#800000] transition"
          >
            Kelola Product Detail
          </Link>
          <Link
            to="/kelola-about"
            className="px-3 py-2 rounded-md hover:bg-[#ecdcdc] hover:text-[#800000] transition"
          >
            Kelola About
          </Link>
          <Link
            to="/kelola-contact"
            className="px-3 py-2 rounded-md hover:bg-[#ecdcdc] hover:text-[#800000] transition"
          >
            Kelola Contact Us
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex p-10">
        <div className="flex-col">
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
          {/* Featured Collection */}
          <section className="mb-10 flex">
            <h2 className="text-lg font-semibold mb-4">Featured Collection</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featured.map((item, idx) => (
                <div key={idx} className="rounded-xl overflow-hidden shadow-sm">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-3 text-center text-sm font-medium">
                    {item.name}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* All Collection Table */}
          <section className="">
            <h2 className="text-lg font-semibold mb-4">All Collection</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border rounded-lg text-sm">
                <thead className="bg-[#f9f0f0] text-left">
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Last Updated</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {collections.map((item, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="px-4 py-3">{item.name}</td>
                      <td className="px-4 py-3 text-[#c66] font-medium">
                        {item.type}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            item.status === "Published"
                              ? "bg-[#fde2e2] text-[#800000]"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">{item.date}</td>
                      <td className="px-4 py-3">
                        <button className="text-[#800000] font-semibold hover:underline">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
