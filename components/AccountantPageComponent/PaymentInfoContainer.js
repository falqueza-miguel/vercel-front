import React, { useState } from 'react';
import SideNavBar from '../Layout/SideNavBar';
import styles from './paymentInfoContainer.module.css';
import PaymentInfo from './PaymentInfo';

function PaymentInfoContainer() {
    const focus = 'third';
    const navBarItems = [
        { id: 1, title: 'Profile', push: '/accountant' },
        { id: 2, title: 'Encode Balance', push: '/accountant/Students' },
        { id: 3, title: 'Payment Information', push: '/accountant/PaymentInfo' },
    ];
    return (
        <div className={styles.paymentInfoContainer}>
            <SideNavBar className={styles.navbarContainer} items={navBarItems} highlighted={focus} />
            <PaymentInfo />
        </div>
    );
}

export default PaymentInfoContainer;
