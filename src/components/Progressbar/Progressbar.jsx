import React, { useEffect, useState } from 'react';
import styles from './progressbar.module.css';

const Progressbar = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => (prev < 100 ? prev + 10 : 100));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.barContainer}>
                    <div className={styles.barBackground}>
                        <div className={styles.progress} style={{ width: `${progress}%` }}></div>
                    </div>
                    <span className={styles.progressText}>{progress}%</span>
                </div>
            </div>
        </div>
    );
};

export default Progressbar;