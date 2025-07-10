import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleContinue = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const name = params.get('name');
    const email = params.get('email');

    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('name', name);
      localStorage.setItem('email', email);
      navigate('/dashboard');
    } else {
      alert('Google login failed!');
      navigate('/');
    }
  }, [navigate]);

  return <div>Redirecting...</div>;
};

export default GoogleContinue;
