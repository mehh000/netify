

'use client';


import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';

const GlobalContext = createContext({});

export const GlobalContextProvider = ({ children }) => {
  const [balance, setBalance] = useState(99999);
  const [tapLimit, setTapLimit] = useState(1);

  const [storage, setStorage] = useState(1000);
  const [storageDynamic, setStorageDynamic] = useState(1000);

  const [touchLvl, setTouchLvl] = useState(1)
  const [touchLvlPrice, setTouchLvlprice] = useState(2000)

  const [storageLvl, setStorageLvl] = useState(1)
  const [storageLvlPrice, setStorageLvlPrice] = useState(2500)

  const [data, setData] = useState({});
  const [loadingg, setLoadingg] = useState(true);
  const [error, setError] = useState(null);

  //fire base data get function here

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.telegram.org/bot7284102937:AAFEFp3JhAjUQv80XtFUiA9kPOUwXJj2HSY/getUpdates'
        );
        setData(response.data); // Update state with the full response data (array)
        console.log('Data fetched:', data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }



    fetchData()
  }, [balance]);

  console.log(data);



  // console.log('Latest Update:', data);



  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const querySnapshot = await getDocs(collection(db, 'users'));
  //     const usersData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  //     setUsers(usersData);
  //     setLoading(false);
  //   };

  //   fetchUsers();

  //   //this forte data from tele api
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('https://api.telegram.org/bot7284102937:AAFEFp3JhAjUQv80XtFUiA9kPOUwXJj2HSY/getUpdates');
  //       setData(response.data);
  //     } catch (error) {
  //       setError('Failed to fetch data');
  //     } 
  //   };

  //   fetchData();

  // }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }






  return (
    <GlobalContext.Provider value={{
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

    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);