'use client'


import React from 'react';
import cl from './member.module.css';
import Image from 'next/image';
import { useGlobalContext } from '@/app/Context/GlobalContext';

const Members = () => {


  const {
    users
  } = useGlobalContext();

  console.log("from member page", users.length
);


  return (
    <div className={cl.container}>
      <div className={cl.searchContainer}>
        <input type="text" placeholder='Find user...' className={cl.input} />
        <Image src='/search1.png' alt='find' width={25} height={25} />
      </div>
      <table className={cl.table}>
        <thead>
          <tr className={cl.theadRow}>
            <th className={cl.th}>Name</th>
            <th className={cl.th}>ID</th>
            <th className={cl.th}>Balance</th>
            <th className={cl.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((data) => (
              <tr className={cl.tbodyRow} key={data.id} >
                <td className={cl.td}>{data.username}</td>
                <td className={cl.td}>{data.userId}</td>
                <td className={cl.td}>{data.balance}</td>
                <td className={cl.td}>
                  <button className={cl.buttonEdit}>Edit</button>
                  <button className={cl.buttonDelete}>Delete</button>
                </td>
              </tr>
            ))
          }


        </tbody>
      </table>
    </div>
  );
};

export default Members;
