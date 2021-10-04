import React from 'react';
import styles from './studentPageContainer.module.css';
import SideNavBar from '../Layout/SideNavBar';
import StudentPage from './StudentPage';

function StudentPageContainer() {
    const focus = 'second';
    const navBarItems = [
        { id: 1, title: 'Profile', push: '/accountant' },
        { id: 2, title: 'Encode Balance', push: '/accountant/Students' },
        { id: 3, title: 'Payment Information', push: '/accountant/PaymentInfo' },
    ];
    return (
        <div className={styles.studentPageContainer}>
            <SideNavBar className={styles.navbarContainer} items={navBarItems} highlighted={focus} />
            <StudentPage className={styles.studentPage} />
        </div>
    );
}

export default StudentPageContainer;
