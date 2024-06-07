"use client"


import React from 'react'
import cl from "./home.module.css"
import Image from 'next/image'


const Homepage = () => {


  return (
    <div className={cl.container}>

      <div className={cl.cardContainer}>
        <Image src='/member.png' height={40} width={40} alt='member' />
        <h1 className={cl.cardTitle}>
          Total Member: 
        </h1>
      </div>

      <div className={cl.cardContainer}>
        <Image src='/coin.png' height={40} width={40} alt='member' />
        <h1 className={cl.cardTitle}>
          Total Coin: <span className={cl.number}>1000</span>
        </h1>
      </div>

    </div>
  )
}

export default Homepage