'use client'

import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const AddUserData = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    userId: '',
    balance: '',
    touchlvl: '',
    storelvl: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, 'users'), {
        first_name: formData.first_name,
        last_name: formData.last_name,
        username: formData.username,
        userId: Number(formData.userId),
        balance: Number(formData.balance),
        touchlvl: Number(formData.touchlvl),
        storelvl: Number(formData.storelvl)
      });
      console.log('Document written with ID: ', docRef.id);
      // Reset form
      setFormData({
        first_name: '',
        last_name: '',
        username: '',
        userId: '',
        balance: '',
        touchlvl: '',
        storelvl: ''
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="first_name"
        placeholder="First Name"
        value={formData.first_name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="last_name"
        placeholder="Last Name"
        value={formData.last_name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="userId"
        placeholder="User ID"
        value={formData.userId}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="balance"
        placeholder="Balance"
        value={formData.balance}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="touchlvl"
        placeholder="Touch Level"
        value={formData.touchlvl}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="storelvl"
        placeholder="Store Level"
        value={formData.storelvl}
        onChange={handleChange}
        required
      />
      <button type="submit">Add User Data</button>
    </form>
  );
};

export default AddUserData;
