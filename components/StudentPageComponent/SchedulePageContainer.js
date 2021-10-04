import React from 'react';
import styles from './schedulePageContainer.module.css';
import SideNavBar from '../Layout/SideNavBar';
import SchedulePage from './SchedulePage';

function SchedulePageContainer() {
      const focus = 'second';
      const navBarItems = [
            { id: 1, title: 'Profile', push: '/student' },
            { id: 2, title: 'Schedule', push: '/student/Schedule' },
            { id: 3, title: 'View Grades', push: '/student/ViewGrades' },
      ];
      return (
            <div className={styles.schedulePageContainer}>
                  <SideNavBar className={styles.navbarContainer} items={navBarItems} highlighted={focus} />
                  <SchedulePage className={styles.schedule} />
            </div>
      );
}

export default SchedulePageContainer;
