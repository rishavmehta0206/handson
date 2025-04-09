import React, { useState } from 'react'
import styles from './navbar.module.css'
import { Menu, X } from 'lucide-react'
const Navbar = () => {
    const [toggle, setToggle] = useState(false)
    return (
        <div className={styles.navContainer}>
            <div className={styles.navWrapper}>
                <div className={styles.navLogo}>
                    <span className={styles.logoImage}>Logo</span>
                    <span className={styles.logoText}>RM's Logo</span>
                </div>
                {/* MOBILE */}
                <div className={styles.navLinksMobileContainer}>
                    <div className={styles.menuButton}>
                        {!toggle ? <Menu className={styles.menuButt} onClick={() => setToggle(true)} /> : <X className={styles.menuButt} onClick={() => setToggle(false)} />}
                        <div className={`${styles.navLinksMobile} ${toggle && styles.active}`}></div>
                    </div>
                </div>
                {/* WEB */}
                <div className={styles.navLinks}>
                    <span className={styles.navLink}>Home</span>
                    <span className={styles.navLink}>About</span>
                    <span className={styles.navLink}>Contact</span>
                </div>
            </div>
        </div>
    )
}

export default Navbar