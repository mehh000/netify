import React from 'react'
import cl from './ragi.module.css'
import Image from 'next/image'
import Link from 'next/link'

const Ragistration = () => {
    return (
        <div className={cl.container}>
            <div className={cl.ragistrationContainer}>
                <h1 className={cl.title}>
                    Ragistration
                </h1>
                <form action="" className={cl.ragoForm}>
                    <div className={cl.inputContainer}>
                        <Image src='/username.png'  alt='userIcon' height={20}
                            width={20} />
                        <input type="text" placeholder='Username' className={cl.inputbox} />

                    </div>
                    <div className={cl.inputContainer}>
                        <Image src='/password.png'  alt='userIcon' height={20}
                            width={20} />
                        <input type="text" placeholder='password' className={cl.inputbox} />
                    </div>
                    <button type="submit" className={cl.subBtn} >
                        Sing in
                    </button>
                </form>
                <p className={cl.backlink}>
                    <Link href={'/login'}> already have a account!
                    </Link>  </p>
            </div>

        </div>
    )
}

export default Ragistration