"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const User = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.telegram.org/bot7284102937:AAFEFp3JhAjUQv80XtFUiA9kPOUwXJj2HSY/getUpdates');
        const updates = response.data.result;

        if (updates.length > 0) {
          const latestUpdate = updates[updates.length - 1];
          setData(latestUpdate);
          console.log('Data fetched:', latestUpdate);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>User Data</h1>
      {data ? (
        <div>
          <p>User ID: {data.message.from.id}</p>
          <p>First Name: {data.message.from.first_name}</p>
          <p>Last Name: {data.message.from.last_name}</p>
          <p>Username: {data.message.from.username}</p>
          <p>Date: {new Date(data.message.date * 1000).toLocaleString()}</p>
          <p>Message: {data.message.text}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default User;
