import React from 'react'
import classes from "./home.module.css"
import Image from 'next/image'

const loading = () => {
    return (
        <div className={classes.container}>
            <div className={classes.loaderContainer}>
                <Image src='/loading.gif' alt='loading' height={100} width={100} />
            </div>

        </div>
    )
}

export default loading