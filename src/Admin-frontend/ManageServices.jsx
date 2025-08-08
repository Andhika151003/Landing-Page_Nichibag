import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageServices = () => {
  const [serviceDescription, setServiceDescription] = useState("");
  const [locations, setLocations] = useState([]);
  const [newLocation, setNewLocation] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    const res = await axios.get("http://localhost:5000/locations");
    setLocations(res.data);
  };

  const handleAddOrUpdate = async () => {
    if (editId) {
      await axios.put(`http://localhost:5000/locations/${editId}`, { name: newLocation });
      setEditId(null);
    } else {
      await axios.post("http://localhost:5000/locations", { name: newLocation });
    }
    setNewLocation("");
    fetchLocations();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/locations/${id}`);
    fetchLocations();
  };

  const handleEdit = (id, name) => {
    setEditId(id);
    setNewLocation(name);
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

      {/* Map Integration */}
      <h3 className="font-semibold mb-4">Map Integration</h3>
      <table className="w-full border rounded-md mb-4">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Location</th>
            <th className="text-left p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((loc) => (
            <tr key={loc._id} className="border-b">
              <td className="p-2">{loc.name}</td>
              <td className="p-2 space-x-2">
                <button onClick={() => handleEdit(loc._id, loc.name)} className="text-blue-500">Edit</button>
                <button onClick={() => handleDelete(loc._id)} className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Location Form */}
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter location"
          className="border rounded-md p-2"
          value={newLocation}
          onChange={(e) => setNewLocation(e.target.value)}
        />
        <button
          onClick={handleAddOrUpdate}
          className="bg-red-500 text-white px-4 py-2 rounded-md"
        >
          {editId ? "Update Location" : "Add Location"}
        </button>
      </div>
    </div>
  );
};

export default ManageServices;
