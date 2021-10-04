import React from 'react';
import styles from './specificBalanceContainer.module.css';
import SideNavBar from '../Layout/SideNavBar';
import SpecificBalance from './SpecificBalance';

function SpecificBalanceContainer(props) {
    const navBarItems = [
        { id: 1, title: 'Profile', push: '/accountant' },
        { id: 2, title: 'Encode Balance', push: '/accountant/Students' },
        { id: 3, title: 'Payment Information', push: '/accountant/PaymentInfo' },
    ];
    return (
        <div className={styles.specificBalancePageContainer}>
            <SideNavBar className={styles.navbarContainer} items={navBarItems} />
            <SpecificBalance className={styles.specificBalance} studID={props.studID} balanceID={props.balanceID} />
        </div>
    );
}

export default SpecificBalanceContainer;
