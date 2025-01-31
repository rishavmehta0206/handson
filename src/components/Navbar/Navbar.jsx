import React, { useState } from 'react'
import styles from './navbar.module.css'

const navLinks = [
    {
        title: "Home",
        path: "/home"
    },
    {
        title: "About",
        path: "/about"
    },
    {
        title: "Contact",
        path: "/contact"
    },
]

const Navbar = () => {
    const [toggle, setToggle] = useState(false)

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.logo}>
                    <h3>Rishav</h3>
                    <span>Toward's the future.</span>
                </div>
                <div className={styles.navlinks}>
                    {navLinks?.map((navLink, index) => (
                        <div key={index} className={styles.navlink}>
                            <span>{navLink.title}</span>
                        </div>
                    ))}
                </div>
                <div className={styles.burgerSubmenu}>
                    <div 
                        className={`${styles.burgerButton} ${toggle ? styles.active : ''}`}
                        onClick={() => setToggle(prev => !prev)}
                    >
                        <div className={styles.burgerLines}></div>
                        <div className={styles.burgerLines}></div>
                        <div className={styles.burgerLines}></div>
                    </div>
                    <div 
                        className={`${styles.mobileMenu} ${toggle ? styles.active : ''}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div onClick={()=>setToggle(false)} style={{
                            position:'absolute',
                            right:"20px",
                            top:"20px",
                            cursor:'pointer'
                        }}>X</div>
                       <div className={styles.navlinksmobile}>
                       {navLinks?.map((navLink, index) => (
                            <div key={index} className={styles.navlinkmobile}>
                                <span>{navLink.title}</span>
                            </div>
                        ))}
                       </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar