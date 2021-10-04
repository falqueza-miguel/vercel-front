import React from 'react';
import styles from './viewPaymentInfoContainer.module.css';
import SideNavBar from '../Layout/SideNavBar';
import ViewPaymentInfo from './ViewPaymentInfo';
function ViewPaymentInfoContainer() {
    const focus = 'fifth';
    const navBarItems = [
        { id: 1, title: 'Profile', push: '/parent' },
        { id: 2, title: 'Schedule', push: '/parent/Schedule' },
        { id: 3, title: 'View Grades', push: '/parent/ViewGrades' },
        { id: 4, title: 'View Balance', push: '/parent/ViewBalances' },
        { id: 5, title: 'Payment Info', push: '/parent/ViewPaymentInfo' },
    ];
    return (
        <div className={styles.viewPaymentInfoPageContainer}>
            <SideNavBar className={styles.navbarContainer} items={navBarItems} highlighted={focus} />
            <ViewPaymentInfo className={styles.viewPaymentInfo} />
        </div>
    );
}

export default ViewPaymentInfoContainer;
