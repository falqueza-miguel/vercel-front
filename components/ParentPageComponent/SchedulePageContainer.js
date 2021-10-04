import React from 'react';
import styles from './schedulePageContainer.module.css';
import SideNavBar from '../Layout/SideNavBar';
import SchedulePage from './SchedulePage';

function SchedulePageContainer() {
    const focus = 'second';
    const navBarItems = [
        { id: 1, title: 'Profile', push: '/parent' },
        { id: 22, title: 'Schedule', push: '/parent/Schedule' },
        { id: 3, title: 'View Grades', push: '/parent/ViewGrades' },
        { id: 4, title: 'View Balance', push: '/parent/ViewBalances' },
        { id: 5, title: 'Payment Info', push: '/parent/ViewPaymentInfo' },
    ];
    return (
        <div className={styles.schedulePageContainer}>
            <SideNavBar className={styles.navbarContainer} items={navBarItems} highlighted={focus} />
            <SchedulePage className={styles.schedule} />
        </div>
    );
}

export default SchedulePageContainer;
