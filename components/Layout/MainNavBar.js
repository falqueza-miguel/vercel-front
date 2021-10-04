import styles from './mainnavbar.module.css';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import axios from 'axios';

function MainNavBar(props) {
    const router = useRouter();
    const logoutHandler = async () => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/logout`, {
                withCredentials: true,
            });

            console.log(response.data);
            if (response.data.success) {
                router.push('/');
                props.login(false);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className={styles.mainNavBarContainer}>
            <h1 className={styles.schoolHeader}>Tierra Monte Integrated School</h1>
            <h2 className={styles.schoolHeaderDetails}>Junior Highschool and Senior Highschool Student Portal</h2>
            {props.isLogin && (
                <button className={styles.logoutButton} onClick={logoutHandler}>
                    Logout
                </button>
            )}
        </div>
    );
}

export default MainNavBar;
