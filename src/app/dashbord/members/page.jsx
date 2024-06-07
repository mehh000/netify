'use client'


import React from 'react';
import cl from './member.module.css';
import Image from 'next/image';


const Members = () => {




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
         
              <tr className={cl.tbodyRow}  >
                <td className={cl.td}>a</td>
                <td className={cl.td}>s</td>
                <td className={cl.td}>d</td>
                <td className={cl.td}>
                  <button className={cl.buttonEdit}>Edit</button>
                  <button className={cl.buttonDelete}>Delete</button>
                </td>
              </tr>
           
          


        </tbody>
      </table>
    </div>
  );
};

export default Members;
