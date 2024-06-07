

'use client';


import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';

const GlobalContext = createContext({});

export const GlobalContextProvider = ({ children }) => {
  const [balance, setBalance] = useState(1000);
  const [tapLimit, setTapLimit] = useState(1);

  const [storage, setStorage] = useState(1000);
  const [storageDynamic, setStorageDynamic] = useState(1000);

  const [touchLvl, setTouchLvl] = useState(1)
  const [touchLvlPrice, setTouchLvlprice] = useState(2000)

  const [storageLvl, setStorageLvl] = useState(1)
  const [storageLvlPrice, setStorageLvlPrice] = useState(2500)

  const [data, setData] = useState({});
  const [auth, setAuth] = useState(false);


  //fire base data get function here

  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);




  //temporaly
  const status = 'unauthinticated'

  useEffect(() => {
    // Get data from local storage
    const userData = localStorage.getItem('userData');
    if (userData) {
      // Parse the JSON string to an object
      const parsedUserData = JSON.parse(userData);
      // Set the user data to the state
      setUsers(parsedUserData);
      setAuth(true)
    }
  }, []);


  console.log("my user data is ", users);
  console.log("my auth data is ", auth);




  return (
    <GlobalContext.Provider value={{
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
      status
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);