import React from 'react';
import styles from './viewBalancesContainer.module.css';
import SideNavBar from '../Layout/SideNavBar';
import ViewBalances from './ViewBalances';

function ViewBalancesContainer() {
    const focus = 'fourth';
    const navBarItems = [
        { id: 1, title: 'Profile', push: '/parent' },
        { id: 2, title: 'Schedule', push: '/parent/Schedule' },
        { id: 3, title: 'View Grades', push: '/parent/ViewGrades' },
        { id: 4, title: 'View Balance', push: '/parent/ViewBalances' },
        { id: 5, title: 'Payment Info', push: '/parent/ViewPaymentInfo' },
    ];
    return (
        <div className={styles.viewBalancesPageContainer}>
            <SideNavBar className={styles.navbarContainer} items={navBarItems} highlighted={focus} />
            <ViewBalances className={styles.viewGrades} />
        </div>
    );
}

export default ViewBalancesContainer;
