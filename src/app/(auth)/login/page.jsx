'use client'



import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import cl from './login.module.css'
import axios from 'axios';
import Image from 'next/image';

const Login = () => {
  const [ipAddress, setIpAddress] = useState('');

  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const response = await axios.get('https://api.ipify.org/?format=json');
        const { ip } = response.data;
        setIpAddress(ip);
      } catch (error) {
        console.error('Error fetching IP address:', error);
      }
    };

    fetchIpAddress();
  }, []);

  return (
    <div className={cl.container}>
      <div className={cl.ragistrationContainer}>
        <h1 className={cl.title}>
          Log in
        </h1>
        <form action="" className={cl.ragoForm}>
          <div className={cl.inputContainer}>
            <Image src='/username.png' alt='userIcon' height={20}
              width={20} />
            <input type="text" placeholder='Username' className={cl.inputbox} />

          </div>
          <div className={cl.inputContainer}>
            <Image src='/password.png' alt='userIcon' height={20}
              width={20} />
            <input type="text" placeholder='password' className={cl.inputbox} />
          </div>
          <button type="submit" className={cl.subBtn} >
            Log in
          </button>
        </form>
        <p className={cl.backlink}>
          <Link href={'/sigin'} >

            free ragistration </Link>
        </p>
      </div>

    </div>
  );
};

export default Login;
