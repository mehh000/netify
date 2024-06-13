"use client";

import React from "react";
import classes from "./home.module.css";
import Image from "next/image";
import CoinImage from "../../public/coin.png";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useGlobalContext } from "./Context/GlobalContext";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { db } from "./firebaseConfig";




const Home = () => {
  const [isClicked, setIsClicked] = useState(false);

  const navigation = useRouter()
  useEffect(() => {
    // Check if user is already logged in
    const userData = localStorage.getItem('userData');
    if (userData) {
      // Redirect to home page if user is already logged in

    } else {
      return  navigation.push('/login');
    }
  }, [navigation]);

  const {
    holdRankingImagePath,
    holdRankingTitle,
    balance,
    tapLimit,
    setBalance,
    storage,
    storageDynamic,
    setStorageDynamic,
    users,
    handleRender,
    handleBalance,
  } = useGlobalContext();



  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 100); // Adjust the time (in milliseconds) as needed
  };


  const handlestorageDynamic = () => {
    setStorageDynamic(storageDynamic - tapLimit);
  };






  return (
    <div className={classes.container}>
      <div className={classes.headContainer}>
        <div className={classes.balanceConainer}>
          <Image src="/coin.png" alt="coin" height={40} width={40} />
          <h1 className={classes.balanceAmount}>{users ? users.balance : 'Loading...'}</h1>
        </div>
        <Link href={"/ranking"}>
          <div className={classes.trofeConatiner}>
            <Image
              src={holdRankingImagePath}
              alt="coin"
              height={30}
              width={30}
            />
            <h1 className={classes.status}>{holdRankingTitle}</h1>
          </div>
        </Link>
      </div>
      {/* head container ends here */}

      <div className={classes.tabConatiner}>
        <button
          className={classes.imageContainer}
          onClick={() => {
            handleBalance(), handlestorageDynamic();
          }}
          disabled={storageDynamic === 0}
        >
          <Image
            src={CoinImage}
            alt="Example"
            className={isClicked ? classes.clickedImage : classes.tabImage}
            onClick={() =>{handleClick() }}
          />
        </button>
      </div>
      {/* Tab container ends here */}

      <div className={classes.featureContainer}>
        <div className={classes.tablimitContainer}>
          <Image src="/thunder.png" alt="thunder" width={25} height={25} />
          <p className={classes.tabLimit}>
            {storageDynamic}/{" "}
            <span className={classes.limitLavel}> {storage} </span>{" "}
          </p>
        </div>

        <div className={classes.feartures}>
          <Link href={"/tesk"}>
            {" "}
            <Image src="/tesk.png" alt="coin" height={35} width={35} />
          </Link>
          <Link href={"/reffer"}>
            {" "}
            <Image src="/friend.png" alt="coin" height={35} width={35} />{" "}
          </Link>
          <Link href={"/bost"}>
            <Image src="/bost.png" alt="coin" height={35} width={35} />{" "}
          </Link>
          <Link href={"/wallet"}>
            <Image src="/wallet.png" alt="coin" height={35} width={35} />{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
