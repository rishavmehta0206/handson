import React, { useEffect, useState } from 'react'
import styles from './formvalidation.module.css';

const FormValidation = () => {

    const [username, setUsername] = useState('');
    const [usernameFocus, setUsernameFocus] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [email, setEmail] = useState('');
    const [emailFocus, setEmailFocus] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    let userNameRegex = /^[a-zA-Z0-9]{3,16}$/;
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);

        if (usernameError && emailError && passwordError) {
            setUsername('');
            setEmail('');
            setPassword('');
            setFormSubmitted(false);
        }
    };

    useEffect(() => {
        if (usernameFocus && username.length > 0) {
            setUsernameError(userNameRegex.test(username))
        };
        if (emailFocus && email.length > 0) {
            setEmailError(emailRegex.test(email))
        };
        if (passwordFocus && password.length > 0) {
            setPasswordError(passwordRegex.test(password))
        };
    }, [username, email, password, usernameFocus, emailFocus, passwordFocus])

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <div className={styles.formWrapper}>
                    <h2 className={styles.formTitle}>Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formField}>
                            <span>Enter Username</span>
                            <input
                                autoComplete='off'
                                onFocus={() => setUsernameFocus(true)}
                                onBlur={() => setUsernameFocus(false)}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                type="text"
                                className={usernameFocus && username && !usernameError ? styles.inputError : ''}
                            />
                            {usernameFocus && username && !usernameError && (
                                <div className={styles.errorContainer}>
                                    <p className={styles.error}>Username must be 3-16 characters and should not contain any special characters</p>
                                </div>
                            )}
                        </div>
                        <div className={styles.formField}>
                            <span>Enter Email</span>
                            <input
                                autoComplete='off'
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setEmailFocus(false)}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="text"
                                className={emailFocus && email && !emailError ? styles.inputError : ''}
                            />
                            {emailFocus && email && !emailError && (
                                <div className={styles.errorContainer}>
                                    <p className={styles.error}>Please enter a valid email address</p>
                                </div>
                            )}
                        </div>
                        <div className={styles.formField}>
                            <span>Enter Password</span>
                            <input
                                autoComplete='off'
                                onFocus={() => setPasswordFocus(true)}
                                onBlur={() => setPasswordFocus(false)}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                className={passwordFocus && password && !passwordError ? styles.inputError : ''}
                            />
                            {passwordFocus && password && !passwordError && (
                                <div className={styles.errorContainer}>
                                    <p className={styles.error}>Password must be at least 8 characters long</p>
                                    <p className={styles.error}>Include at least one uppercase letter</p>
                                    <p className={styles.error}>Include at least one lowercase letter</p>
                                    <p className={styles.error}>Include at least one number</p>
                                    <p className={styles.error}>Include at least one special character (@$!%*?&)</p>
                                </div>
                            )}
                        </div>
                        <button type="submit" className={styles.submitButton}>
                            Submit
                        </button>
                        {formSubmitted && (!usernameError || !emailError || !passwordError) && (
                            <div className={styles.formError}>
                                Please fix all errors before submitting
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default FormValidation