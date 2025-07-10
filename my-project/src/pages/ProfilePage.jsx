// File: src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function Profile() {
  const { user, updateUser } = useUser();
  const [formData, setFormData] = useState({ name: '', email: '', contact: '' });
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const fetchProfile = async () => {
    if (!token) {
      navigate('/');
      return;
    }
    try {
      const res = await axios.get('http://localhost:3001/api/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const profileData = res.data;
      setFormData({
        name: profileData.name || '',
        email: profileData.email || '',
        contact: profileData.contact || '',
      });
      updateUser(profileData.name || '', profileData.email || '');
    } catch (err) {
      alert('Session expired or unauthorized. Please login again.');
      localStorage.clear();
      navigate('/');
      window.location.reload();
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []); // fetch on mount

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put('http://localhost:3001/api/profile', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedData = res.data;
      setFormData({
        name: updatedData.name || '',
        email: updatedData.email || '',
        contact: updatedData.contact || '',
      });
      updateUser(updatedData.name || '', updatedData.email || '');
      localStorage.setItem('name', updatedData.name || 'User');
      localStorage.setItem('email', updatedData.email || '');
      setEditMode(false);
      alert('Profile updated successfully');
    } catch (err) {
      alert('Failed to update profile. Please login again.');
      localStorage.clear();
      navigate('/');
      window.location.reload();
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your account?')) return;
    try {
      await axios.delete('http://localhost:3001/api/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.clear();
      updateUser('', '');
      navigate('/');
      window.location.reload();
    } catch (err) {
      alert('Failed to delete account.');
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Profile</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`  ${editMode ? 'border p-2 rounded w-full bg-gray-100' : 'bg-white cursor-not-allowed'}`}
            disabled={!editMode}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            className="bg-white cursor-not-allowed"
            disabled
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Contact</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className={` ${editMode ? 'border p-2 rounded w-full bg-gray-100' : 'bg-white cursor-not-allowed'}`}
            disabled={!editMode}
          />
        </div>

        <div className="flex gap-4 mt-4">
          {editMode ? (
            <>
              <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleUpdate}>
                Save
              </button>
              <button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => setEditMode(false)}>
                Cancel
              </button>
            </>
          ) : (
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </button>
          )}

          <button
            className="bg-red-600 text-white px-4 py-2 rounded"
            onClick={handleDelete}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
