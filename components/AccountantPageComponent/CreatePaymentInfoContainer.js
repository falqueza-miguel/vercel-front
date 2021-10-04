import React, { useState } from 'react';
import SideNavBar from '../Layout/SideNavBar';
import styles from './createPaymentInfoContainer.module.css';
import CreatePaymentInfo from './CreatePaymentInfo';

function CreatePaymentInfoContainer() {
    const focus = 'third';
    const navBarItems = [
        { id: 1, title: 'Profile', push: '/accountant' },
        { id: 2, title: 'Encode Balance', push: '/accountant/Students' },
        { id: 3, title: 'Payment Information', push: '/accountant/PaymentInfo' },
    ];
    return (
        <div className={styles.createPaymentInfoContainer}>
            <SideNavBar className={styles.navbarContainer} items={navBarItems} highlighted={focus} />
            <CreatePaymentInfo />
        </div>
    );
}

export default CreatePaymentInfoContainer;
