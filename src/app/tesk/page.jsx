



import Image from "next/image"
import classes from "./tesk.module.css"
import React from 'react'

const Tesk = () => {
    return (
        <div className={classes.container}>
            <div className={classes.headContainer}>
                <h1 className={classes.title}>Earn from tesk!</h1>
            </div>
            <div className={classes.teskContainer}>
            <div className={classes.tesk}>
                    <Image src='/tesk.png' alt="tesk" width={40} height={40} />
                    <div className={classes.teslkInfo}>
                        <p className={classes.teskTitle}>Join The W-Coin and earn more</p>
                        <p className={classes.teskreword}>
                            <Image src='/coin.png' alt="tesk" width={16} height={16} />
                            25000
                        </p>
                    </div>
                </div>

                <div className={classes.tesk}>
                    <Image src='/tesk.png' alt="tesk" width={40} height={40} />
                    <div className={classes.teslkInfo}>
                        <p className={classes.teskTitle}>Join The W-Coin and earn more</p>
                        <p className={classes.teskreword}>
                            <Image src='/coin.png' alt="tesk" width={16} height={16} />
                            25000
                        </p>
                    </div>
                </div>

                <div className={classes.tesk}>
                    <Image src='/tesk.png' alt="tesk" width={40} height={40} />
                    <div className={classes.teslkInfo}>
                        <p className={classes.teskTitle}>Join The W-Coin and earn more</p>
                        <p className={classes.teskreword}>
                            <Image src='/coin.png' alt="tesk" width={16} height={16} />
                            25000
                        </p>
                    </div>
                </div>

                <div className={classes.tesk}>
                    <Image src='/tesk.png' alt="tesk" width={40} height={40} />
                    <div className={classes.teslkInfo}>
                        <p className={classes.teskTitle}>Join The W-Coin and earn more</p>
                        <p className={classes.teskreword}>
                            <Image src='/coin.png' alt="tesk" width={16} height={16} />
                            25000
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tesk