'use client';

import { collection, getDocs, doc, updateDoc, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { createContext, useContext, useState, useEffect } from "react";
import Levels from '../lib/rankingData';

const GlobalContext = createContext({});

export const GlobalContextProvider = ({ children }) => {
  const [balance, setBalance] = useState( 100000);

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

  const fetchUserData = async (unicid) => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('unicid', '==', unicid));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      return { ...userData, id: querySnapshot.docs[0].id };
    }
    return null;
  };

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setUsers(parsedUserData);
      setAuth(true);
      setBalance(parsedUserData.balance);  // Set balance from local storage
    }
  }, []);

  useEffect(() => {
    if (users) {
      const updateUserData = async () => {
        const fetchedUserData = await fetchUserData(users.unicid);
        if (fetchedUserData) {
          localStorage.setItem('userData', JSON.stringify(fetchedUserData));
          setUsers(fetchedUserData);
          setBalance(fetchedUserData.balance);  // Set balance from fetched data
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

  const handleBalance = () => {
    if (users) {
      const newBalance = balance + 1;
      setBalance(newBalance);
      const updatedUserData = { ...users, balance: newBalance };
      setUsers(updatedUserData);
      localStorage.setItem('userData', JSON.stringify(updatedUserData));
    }
  };

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        const userDocRef = doc(db, 'users', parsedUserData.id);
        await updateDoc(userDocRef, { balance: parsedUserData.balance });
      }
    }, 200);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

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
      handleBalance, // Provide handleBalance in context
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
