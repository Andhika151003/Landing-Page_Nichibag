import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageServices = () => {
  const [serviceDescription, setServiceDescription] = useState("");
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ phone: "", email: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const res = await axios.get("http://localhost:5000/contacts");
    setContacts(res.data);
  };

  const handleAddOrUpdate = async () => {
    if (!form.phone || !form.email) return alert("Isi semua field!");

    if (editId) {
      await axios.put(`http://localhost:5000/contacts/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post("http://localhost:5000/contacts", form);
    }

    setForm({ phone: "", email: "" });
    fetchContacts();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/contacts/${id}`);
    fetchContacts();
  };

  const handleEdit = (contact) => {
    setEditId(contact._id);
    setForm({ phone: contact.phone, email: contact.email });
  };

  return (
    <div className="min-h-screen bg-white px-8 py-10">
      <h2 className="text-2xl font-bold mb-6">Manage Services Section</h2>

      {/* Service Description */}
      <div className="mb-8">
        <label className="block font-semibold mb-2">Service Description</label>
        <textarea
          className="border rounded-md p-2 w-full"
          rows="4"
          value={serviceDescription}
          onChange={(e) => setServiceDescription(e.target.value)}
        />
      </div>

      {/* Contact Management */}
      <h3 className="font-semibold mb-4">Contact Information</h3>
      <table className="w-full border rounded-md mb-4">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Phone</th>
            <th className="text-left p-2">Email</th>
            <th className="text-left p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id} className="border-b">
              <td className="p-2">{contact.phone}</td>
              <td className="p-2">{contact.email}</td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => handleEdit(contact)}
                  className="text-blue-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(contact._id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add / Update Contact Form */}
      <div className="flex flex-col gap-2 mb-4 max-w-md">
        <input
          type="text"
          placeholder="Enter phone number"
          className="border rounded-md p-2"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <input
          type="email"
          placeholder="Enter email address"
          className="border rounded-md p-2"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <button
          onClick={handleAddOrUpdate}
          className="bg-red-500 text-white px-4 py-2 rounded-md"
        >
          {editId ? "Update Contact" : "Add Contact"}
        </button>
      </div>
    </div>
  );
};

export default ManageServices;
