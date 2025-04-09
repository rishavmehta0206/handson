import React, { useEffect, useState } from 'react'
import styles from './toast.module.css'

const Toast = () => {
    const [toastToggle, setToastToggle] = useState(false);
    const [toastArray,setToastArray] = useState([]);
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <span onClick={() => setToastToggle(true)} className={styles.toastButton}>Toast</span>
                <ToastComponent
                    title="Toast Title"
                    body="Toast Body"
                    time={3000}
                    toastToggle={toastToggle}
                    setToastToggle={setToastToggle}
                />
            </div>
        </div>
    );
}

export default Toast;

const ToastComponent = ({ title, body, time, toastToggle, setToastToggle }) => {

    useEffect(() => {
        if (toastToggle) {
            let timer = setTimeout(() => {
                setToastToggle(false);
            }, time);

            return () => clearTimeout(timer);
        }
    }, [toastToggle, time, setToastToggle]);

    return (
        <div className={`${styles.toastContainer} ${toastToggle ? styles.active : ""}`}>
            <div className={styles.toast}>
                <div className={styles.toastHeader}>
                    <span className={styles.toastTitle}>{title}</span>
                    <span
                        style={{
                            cursor: 'pointer',
                        }}
                        className={styles.toastClose}
                        onClick={() => setToastToggle(false)}
                    >
                        x
                    </span>
                </div>
                <div className={styles.toastBody}>
                    <p>{body}</p>
                </div>
            </div>
            <ProgressBar time={time} isVisible={toastToggle} />
        </div>
    );
};


const ProgressBar = ({ time, isVisible }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {

        if (isVisible) {
            setProgress(0);
            const startTime = Date.now();

            const interval = setInterval(() => {
                const elapsedTime = Date.now() - startTime;
                const newProgress = time > 0 ? Math.min(100, (elapsedTime / time) * 100) : 0;


                setProgress(newProgress);

                if (newProgress >= 100) {
                    clearInterval(interval);
                }
            }, 10);

            return () => clearInterval(interval);
        }
    }, [isVisible, time]);


    return (
        <div className={styles.progressBarContainer}>
            <div
                className={styles.progressBar}
                style={{ width: `${progress}%` }}
            />
        </div>
    );
};