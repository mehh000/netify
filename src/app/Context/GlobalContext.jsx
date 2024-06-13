'use client';

import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';
import Levels from '../lib/rankingData';

const GlobalContext = createContext({});

export const GlobalContextProvider = ({ children }) => {
  const [balance, setBalance] = useState(100000);
  const [tapLimit, setTapLimit] = useState(1);
  const [storage, setStorage] = useState(1000);
  const [storageDynamic, setStorageDynamic] = useState(1000);
  const [touchLvl, setTouchLvl] = useState(1);
  const [touchLvlPrice, setTouchLvlprice] = useState(2000);
  const [storageLvl, setStorageLvl] = useState(1);
  const [storageLvlPrice, setStorageLvlPrice] = useState(2500);
  const [auth, setAuth] = useState(false);
  const [users, setUsers] = useState();
  const [holdRankingImagePath, setHoldRankingImagePath] = useState("");
  const [holdRankingTitle, setHoldRankingTitle] = useState("");

  // Fetch data from Firestore based on unicid
  const fetchUserData = async (unicid) => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('unicid', '==', unicid));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      return { id: querySnapshot.docs[0].id, ...userData };
    }
    return null;
  };

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setUsers(parsedUserData);
      setAuth(true);
    }
  }, []);

  useEffect(() => {
    if (users) {
      const updateUserData = async () => {
        const fetchedUserData = await fetchUserData(users.unicid);
        if (fetchedUserData) {
          localStorage.setItem('userData', JSON.stringify(fetchedUserData));
          setUsers(fetchedUserData);
        }
      };
      updateUserData();
    }
  }, [users]);

  useEffect(() => {
    if (users) {
      console.log(users.username); // This will log the username once users is set
    }
  }, [users]);

  useEffect(() => {
    if (users) {
      if (users.balance === 0 || users.balance < 100000) {
        setHoldRankingImagePath(Levels[0].image);
        setHoldRankingTitle(Levels[0].name);
      } else if (users.balance <= 499999) {
        setHoldRankingImagePath(Levels[1].image);
        setHoldRankingTitle(Levels[1].name);
      } else if (users.balance <= 999999) {
        setHoldRankingImagePath(Levels[2].image);
        setHoldRankingTitle(Levels[2].name);
      } else if (users.balance <= 1999999) {
        setHoldRankingImagePath(Levels[3].image);
        setHoldRankingTitle(Levels[3].name);
      } else if (users.balance <= 4999999) {
        setHoldRankingImagePath(Levels[4].image);
        setHoldRankingTitle(Levels[4].name);
      } else if (users.balance <= 99999999) {
        setHoldRankingImagePath(Levels[5].image);
        setHoldRankingTitle(Levels[5].name);
      } else {
        setHoldRankingImagePath(Levels[6].image);
        setHoldRankingTitle(Levels[6].name);
      }
    }
  }, [users, balance]);

  const handleBalance = async () => {
    if (users) {
      try {
        const userDocRef = doc(db, 'users', users.id);
        await updateDoc(userDocRef, {
          balance: users.balance + 1
        });
        const updatedUser = { ...users, balance: users.balance + 1 };
        setUsers(updatedUser);
        localStorage.setItem('userData', JSON.stringify(updatedUser));
      } catch (error) {
        console.error('Error updating balance:', error);
      }
    }
  };

  return (
    <GlobalContext.Provider value={{
      holdRankingImagePath,
      holdRankingTitle,
      setHoldRankingImagePath,
      setHoldRankingTitle,
      auth,
      users,
      balance,
      tapLimit,
      setBalance,
      storage,
      storageDynamic,
      setStorageDynamic,
      touchLvl,
      touchLvlPrice,
      storageLvl,
      storageLvlPrice,
      setTouchLvl,
      setTouchLvlprice,
      setStorageLvl,
      setStorageLvlPrice,
      setTapLimit,
      setStorage,
      handleBalance,
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
