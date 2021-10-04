import React from 'react';
import styles from './viewGradesContainer.module.css';
import SideNavBar from '../Layout/SideNavBar';
import ViewGrades from './ViewGrades';

function ViewGradesContainer() {
    const focus = 'third';
    const navBarItems = [
        { id: 1, title: 'Profile', push: '/parent' },
        { id: 2, title: 'Schedule', push: '/parent/Schedule' },
        { id: 3, title: 'View Grades', push: '/parent/ViewGrades' },
        { id: 4, title: 'View Balance', push: '/parent/ViewBalances' },
        { id: 5, title: 'Payment Info', push: '/parent/ViewPaymentInfo' },
    ];
    return (
        <div className={styles.viewGradesPageContainer}>
            <SideNavBar className={styles.navbarContainer} items={navBarItems} highlighted={focus} />
            <ViewGrades className={styles.viewGrades} />
        </div>
    );
}

export default ViewGradesContainer;
