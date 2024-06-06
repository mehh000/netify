'use client'

import React, { useState } from 'react'
import classes from './rank.module.css'
import Image from 'next/image'
import Levels from '../lib/rankingData'

const Ranking = () => {


    const [currentLevel, setCurrentLevel] = useState(0);

    const handleLeftClick = () => {
        setCurrentLevel((prevLevel) => (prevLevel > 0 ? prevLevel - 1 : Levels.length - 1));
    };

    const handleRightClick = () => {
        setCurrentLevel((prevLevel) => (prevLevel < Levels.length - 1 ? prevLevel + 1 : 0));
    };

    return (
        <div className={classes.container}>
            <div className={classes.rankContainer}>
                <button className={classes.left} onClick={handleLeftClick}>
                    <Image src='/left.png' alt='left' width={30} height={30} />
                </button>
                <div className={classes.rankInfo}>
                    <Image src={Levels[currentLevel].image} alt={Levels[currentLevel].name} width={50} height={50} />
                    <div className={classes.rankTitileContainer}>
                        <p className={classes.title}>{Levels[currentLevel].name}</p>
                        <p className={classes.coin}>Coins: {Levels[currentLevel].coin.toLocaleString()}</p>
                    </div>

                </div>
                <button className={classes.right} onClick={handleRightClick}>
                    <Image src='/right.png' alt='right' width={30} height={30} />
                </button>
            </div>
            
        </div>
    );
};

export default Ranking;
