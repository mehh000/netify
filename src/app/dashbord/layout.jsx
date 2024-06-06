'use client'

import React from 'react'
import cl from "./dashboard.module.css"
import Image from 'next/image'
import Link from 'next/link'

const Dashbord = ({children}) => {


  return (
    <div className={cl.container}>
      <div className={cl.header}>
        <Image src='/coin.png' height={40} width={40} alt='logo' />
        <h1 className={cl.title}>Fishcoin</h1>
      </div>
      <div className={cl.sidebar}>
        <ul className={cl.ultag}>
          <li className={cl.litag}>
            <Link href='/dashbord/home' > Home</Link>
          </li>
          <li className={cl.litag}>
            <Link href='/dashbord/members' > Members</Link>
          </li>
          <li className={cl.litag}>
            <Link href='/dashbord/tesk' > Tesk</Link>
          </li>
        </ul>
      </div>
      <div className={cl.content}>
        {children}
      </div>
    </div>
  )
}

export default Dashbord
