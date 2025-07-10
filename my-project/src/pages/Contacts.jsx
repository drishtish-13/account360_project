// File: src/pages/Contacts.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', contact: '', action: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/contacts');
      setContacts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddOrUpdate = async () => {
    if (editingId) {
      await axios.put(`http://localhost:3001/api/contacts/${editingId}`, formData);
    } else {
      await axios.post('http://localhost:3001/api/contacts', formData);
    }
    fetchContacts();
    setShowForm(false);
    setFormData({ name: '', email: '', contact: '', action: '' });
    setEditingId(null);
  };

  const handleEdit = (contact) => {
    setFormData(contact);
    setEditingId(contact._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/api/contacts/${id}`);
    fetchContacts();
  };

  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.contact.includes(searchTerm)
  );

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 rounded w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => {
            setShowForm(true);
            setFormData({ name: '', email: '', contact: '', action: '' });
            setEditingId(null);
          }}
        >
          Add Contact
        </button>
      </div>

      {showForm && (
        <div className="border p-4 rounded mb-4">
          <h2 className="text-lg font-semibold mb-2">{editingId ? 'Edit Contact' : 'Add Contact'}</h2>
          <input
            type="text"
            placeholder="Name"
            className="border p-2 rounded mb-2 w-full"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded mb-2 w-full"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Contact Number"
            className="border p-2 rounded mb-2 w-full"
            value={formData.contact}
            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
          />
          <input
            type="text"
            placeholder="Action"
            className="border p-2 rounded mb-2 w-full"
            value={formData.action}
            onChange={(e) => setFormData({ ...formData, action: e.target.value })}
          />
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mr-2"
            onClick={handleAddOrUpdate}
          >
            {editingId ? 'Update Contact' : 'Add Contact'}
          </button>
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            onClick={() => {
              setShowForm(false);
              setEditingId(null);
            }}
          >
            Cancel
          </button>
        </div>
      )}

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Contact</th>
            <th className="p-2 border">Action</th>
            <th className="p-2 border">Operations</th>
          </tr>
        </thead>
        <tbody>
          {filteredContacts.map(contact => (
            <tr key={contact._id} className="text-center">
              <td className="p-2 border">{contact.name}</td>
              <td className="p-2 border">{contact.email}</td>
              <td className="p-2 border">{contact.contact}</td>
              <td className="p-2 border">{contact.action}</td>
              <td className="p-2 border">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2"
                  onClick={() => handleEdit(contact)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                  onClick={() => handleDelete(contact._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
