import React from 'react'
import classes from "./reffer.module.css"
import Image from 'next/image'

const Freefer = () => {
  return (
    <div className={classes.container}>
      <div className={classes.headContainer}>
        <h1 className={classes.title}>
          Friends
        </h1>
        <div className={classes.refInfoContainer}>

          <Image src='/coin.png' alt='coin' width={50} height={50} />
          <div className={classes.refBonusContainer}>
            <p className={classes.details}>
              Invite friends   </p>
            <span className={classes.andget}>
              and get <span className={classes.ammount}>
                <Image src='/coin.png' alt='coin' width={10} height={10} /> 2500
              </span>
            </span>

          </div>
        </div>
      </div>
      <div className={classes.invitedContainer}>

      </div>
      <div className={classes.linkContainer}>
        <div className={classes.copyactionContainer}>
          <Image src='/copy.png' alt='copy' height={30} width={30} />
        </div>
        <div className={classes.inviteLink}>
          invite your friends
        </div>

      </div>
    </div>
  )
}

export default Freefer