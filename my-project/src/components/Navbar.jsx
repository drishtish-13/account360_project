// File: src/components/Navbar.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Search, Bell } from 'lucide-react';
import { useUser } from '../context/UserContext';

const getPathLabel = (pathname) => {
  const segments = pathname.split('/').filter(Boolean);
  return segments.length > 0
    ? segments.map((seg, i) => (
        <span key={i} className="capitalize">
          {seg.replace(/-/g, ' ')}
          {i < segments.length - 1 ? ' / ' : ''}
        </span>
      ))
    : 'Dashboard';
};

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const { user } = useUser();  // Access context safely
  const { updateUser } = useUser();


  const handleLogout = () => {
  localStorage.clear();
  updateUser('', '');  // Reset context to empty
  navigate('/');
  window.location.reload();
};


  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">
      <div className="text-sm text-gray-600">{getPathLabel(location.pathname)}</div>
      <div className="flex items-center gap-4">
        <Search className="w-5 h-5" />
        <Bell className="w-5 h-5" />
        <div className="relative">
          <div
            onClick={() => setShowDropdown(!showDropdown)}
            className="cursor-pointer flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              👤
            </div>
            <div className="text-sm font-medium text-blue-700 truncate max-w-[100px]">
              {user.name || 'User'}
            </div>
          </div>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10">
              <Link
                to="/profile"
                className="block py-2 px-4 text-sm hover:bg-gray-100 cursor-pointer"
                onClick={() => setShowDropdown(false)}
              >
                Profile
              </Link>
              <div
                className="py-2 px-4 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
                onClick={handleLogout}
              >
                Log Out
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
