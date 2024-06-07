"use client";

import React from "react";
import classes from "./home.module.css";
import Image from "next/image";
import CoinImage from "../../public/coin.png";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useGlobalContext } from "./Context/GlobalContext";
import Levels from "./lib/rankingData";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";




const Home = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [holdRankingImagePath, setHoldRankingImagePath] = useState("");
  const [holdRankingTitle, setHoldRankingTitle] = useState("");
  const navigation = useRouter()


  const {
    auth,
    setUsers,
    users,
    status,
    balance,
    tapLimit,
    setBalance,
    storage,
    storageDynamic,
    setStorageDynamic,
  } = useGlobalContext();


if(auth == false){
    navigation.push('/login')
  } else {
    navigation.push('/')
  }



  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 100); // Adjust the time (in milliseconds) as needed
  };

  const handleBalance = () => {
    setBalance(balance + tapLimit);
  };

  const handlestorageDynamic = () => {
    setStorageDynamic(storageDynamic - tapLimit);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (storageDynamic < storage) {
        setStorageDynamic((prevValue) => prevValue + 1);
      } else {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [storageDynamic]);

  useEffect(() => {
    if (balance === 0 || balance < 100000) {
      setHoldRankingImagePath(Levels[0].image);
      setHoldRankingTitle(Levels[0].name);
    } else if (balance <= 499999) {
      setHoldRankingImagePath(Levels[1].image);
      setHoldRankingTitle(Levels[1].name);
    } else if (balance <= 999999) {
      setHoldRankingImagePath(Levels[2].image);
      setHoldRankingTitle(Levels[2].name);
    } else if (balance <= 1999999) {
      setHoldRankingImagePath(Levels[3].image);
      setHoldRankingTitle(Levels[3].name);
    } else if (balance <= 4999999) {
      setHoldRankingImagePath(Levels[4].image);
      setHoldRankingTitle(Levels[4].name);
    } else if (balance <= 99999999) {
      setHoldRankingImagePath(Levels[5].image);
      setHoldRankingTitle(Levels[5].name);
    } else {
      setHoldRankingImagePath(Levels[6].image);
      setHoldRankingTitle(Levels[6].name);
    }
    console.log(holdRankingImagePath);
  }, [balance]);

  return (
    <div className={classes.container}>
      <div className={classes.headContainer}>
        <div className={classes.balanceConainer}>
          <Image src="/coin.png" alt="coin" height={40} width={40} />
          <h1 className={classes.balanceAmount}>{balance}</h1>
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
            onClick={handleClick}
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
          <Link href={"/cureentuser"}>
            <Image src="/coin.png" alt="coin" height={35} width={35} />{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
