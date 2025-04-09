import React from 'react';
import styles from './holygrail.module.css';

const HolyGrail = () => {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.header}>Header</div>
                <div className={styles.sidebar}>Left Sidebar</div>
                <div className={styles.main}>Main Content</div>
                <div className={styles.sidebarRight}>Right Sidebar</div>
                <div className={styles.footer}>Footer</div>
            </div>
        </div>
    );
}

export default HolyGrail;
