'use client';

import React, { useState, useEffect } from 'react';
import cl from './ragi.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import axios from 'axios';

const Ragistration = () => {
    const [ipAddress, setIpAddress] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

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

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear previous error messages

        try {
            // Query Firestore for existing IP address
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('ipAddress', '==', ipAddress));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                // IP address found, show error message
                setErrorMessage('Multiple ID on one device');
            } else {
                // IP address not found, proceed with adding new user
                const docRef = await addDoc(collection(db, 'users'), {
                    username: formData.username,
                    password: formData.password,
                    balance: 1000,
                    unicid: Date.now(),
                    touchlvl: 1,
                    storelvl: 1,
                    ipAddress: ipAddress, // Add IP address to the Firestore document
                });
                console.log('Document written with ID: ', docRef.id);
                // Reset form
                setFormData({
                    username: '',
                    password: '',
                });
            }
        } catch (e) {
            console.error('Error checking IP address or adding document: ', e);
        }
    };

    return (
        <div className={cl.container}>
            <div className={cl.ragistrationContainer}>
                <h1 className={cl.title}>
                    Registration
                </h1>
                {errorMessage && <p className={cl.error}>{errorMessage}</p>}
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
                        Sign in
                    </button>
                </form>
                <p className={cl.backlink}>
                    <Link href={'/login'}>Already have an account!</Link>
                </p>
            </div>
        </div>
    );
};

export default Ragistration;
