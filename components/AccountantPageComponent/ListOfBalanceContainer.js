import React from 'react';
import styles from './listOfBalanceContainer.module.css';
import SideNavBar from '../Layout/SideNavBar';
import ListOfBalance from './ListOfBalance';

function ListOfBalanceContainer(props) {
    const navBarItems = [
        { id: 1, title: 'Profile', push: '/accountant' },
        { id: 2, title: 'Encode Balance', push: '/accountant/Students' },
        { id: 3, title: 'Payment Information', push: '/accountant/PaymentInfo' },
    ];
    return (
        <div className={styles.listOfBalanceContainer}>
            <SideNavBar className={styles.navbarContainer} items={navBarItems} />
            <ListOfBalance className={styles.studentPage} user={props.user} balances={props.balances} />
        </div>
    );
}

export default ListOfBalanceContainer;
