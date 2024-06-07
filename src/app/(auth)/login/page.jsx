'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import cl from './login.module.css';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; // Adjust the path to your Firebase config file
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const navigation =  useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(''); // Clear previous errors

    try {
      // Query the Firestore collection for the user
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('username', '==', formData.username), where('password', '==', formData.password));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // User found
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          console.log('User data:', userData);
          // Store user data in local storage
           navigation.push('/')
          localStorage.setItem('userData', JSON.stringify(userData));
         

        });
      } else {
        setFormError('Invalid username or password');
      }

      // Reset form
      setFormData({
        username: '',
        password: ''
      });
    } catch (error) {
      console.error('Error checking user:', error);
      setFormError('An error occurred. Please try again.');
    }
  };

  return (
    <div className={cl.container}>
      <div className={cl.ragistrationContainer}>
        <h1 className={cl.title}>
          Log in
        </h1>
        {formError && <p className={cl.error}>{formError}</p>}
        <form className={cl.ragoForm} onSubmit={handleSubmit}>
          <div className={cl.inputContainer}>
            <Image src='/username.png' alt='userIcon' height={20} width={20} />
            <input
              type="text"
              placeholder='Username'
              className={cl.inputbox}
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className={cl.inputContainer}>
            <Image src='/password.png' alt='passwordIcon' height={20} width={20} />
            <input
              type="password"
              placeholder='Password'
              className={cl.inputbox}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className={cl.subBtn}>
            Log in
          </button>
        </form>
        <p className={cl.backlink}>
          <Link href={'/signup'}>free registration</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
