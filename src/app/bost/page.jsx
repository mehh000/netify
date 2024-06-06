'use client'



import Image from "next/image"
import clases from "./bost.module.css"
import React from 'react'
import { useState } from 'react';
import { useGlobalContext } from "../Context/GlobalContext";

const Bost = () => {

  const {
    tapLimit,
    setBalance,
    balance,
    touchLvl,
    touchLvlPrice,
    storageLvl,
    storageLvlPrice,
    setTouchLvl,
    setTouchLvlprice,
    setStorageLvl,
    setStorageLvlPrice,
    setTapLimit,
    storage,
    setStorage

  } = useGlobalContext();

  const handleBuyMultiTap = () => {
    if (balance >= touchLvlPrice) {
      setBalance(balance - touchLvlPrice)
      setTouchLvl(touchLvl + 1)
      setTouchLvlprice(touchLvlPrice * 2)
      setTapLimit(tapLimit + 1)
    }
  }
  const handleBuyStorage = () => {
    if (balance >= storageLvlPrice) {
      setBalance(balance - storageLvlPrice)
      setStorageLvl(storageLvl + 1)
      setStorageLvlPrice(storageLvlPrice * 2)
      setStorage(storage + 1000)
    }
  }


  return (
    <div className={clases.container}>
      <h1 className={clases.title}>Boost</h1>
      <div className={clases.bostContainer}>

        <div className={clases.bostCard} onClick={handleBuyMultiTap} >
          <div className={clases.iconContainer}>
            <Image src='/touch.png' height={35} width={35} alt="touch" />
          </div>
          <div className={clases.bostCardInfo}>
            <p className={clases.cardTitle}>Multiple touch</p>
            <p className={clases.cardamount}>
              <span className={clases.levl}>
                {touchLvl} lvl
              </span>
              <Image src='/coin.png' height={15} width={15} alt="coin" />
              {touchLvlPrice}
            </p>
          </div>
        </div>

        <div className={clases.bostCard} onClick={handleBuyStorage}>
          <div className={clases.iconContainer}>
            <Image src='/storage.png' height={35} width={35} alt="touch" />
          </div>
          <div className={clases.bostCardInfo}>
            <p className={clases.cardTitle}>Storage</p>
            <p className={clases.cardamount}>
              <span className={clases.levl}>
                {storageLvl} lvl
              </span>
              <Image src='/coin.png' height={15} width={15} alt="coin" />
              {storageLvlPrice}
            </p>
          </div>
        </div>

        <div className={clases.bostCard}>
          <div className={clases.iconContainer}>
            <Image src='/robot.png' height={35} width={35} alt="touch" />
          </div>
          <div className={clases.bostCardInfo}>
            <p className={clases.cardTitle}>Bot</p>
            <p className={clases.cardamount}>
              <span className={clases.levl}>
                coimg soon..
              </span>
              <Image src='/coin.png' height={15} width={15} alt="coin" />
              1200000
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Bost