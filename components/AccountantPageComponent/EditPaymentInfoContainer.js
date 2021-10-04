import React, { useState } from 'react';
import SideNavBar from '../Layout/SideNavBar';
import styles from './editPaymentInfoContainer.module.css';
import EditPaymentInfo from './EditPaymentInfo';

function EditPaymentInfoContainer(props) {
    const navBarItems = [
        { id: 1, title: 'Profile', push: '/accountant' },
        { id: 2, title: 'Encode Balance', push: '/accountant/Students' },
        { id: 3, title: 'Payment Information', push: '/accountant/PaymentInfo' },
    ];
    return (
        <div className={styles.editPaymentInfoContainer}>
            <SideNavBar className={styles.navbarContainer} items={navBarItems} />
            <EditPaymentInfo id={props.id} />
        </div>
    );
}

export default EditPaymentInfoContainer;
