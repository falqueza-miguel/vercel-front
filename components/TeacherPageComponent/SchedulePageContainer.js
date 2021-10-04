import React from 'react';
import styles from './schedulePageContainer.module.css';
import SideNavBar from '../Layout/SideNavBar';
import SchedulePage from './SchedulePage';

function SchedulePageContainer(props) {
      const focus = 'second';
      const navBarItems = [
            { id: 1, title: 'Profile', push: '/teacher' },
            { id: 2, title: 'Schedule', push: '/teacher/Schedule' },
            { id: 3, title: 'Encode Grade', push: '/teacher/Sections' },
      ];

      return (
            <div className={styles.schedulePageContainer}>
                  <SideNavBar className={styles.navbarContainer} items={navBarItems} highlighted={focus} />
                  <SchedulePage className={styles.schedule} />
            </div>
      );
}

export default SchedulePageContainer;
