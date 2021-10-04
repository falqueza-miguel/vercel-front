import React from 'react';
import styles from './viewGradesContainer.module.css';
import SideNavBar from '../Layout/SideNavBar';
import ViewGrades from './ViewGrades';

function ViewGradesContainer() {
      const focus = 'third';
      const navBarItems = [
            { id: 1, title: 'Profile', push: '/student' },
            { id: 2, title: 'Schedule', push: '/student/Schedule' },
            { id: 3, title: 'View Grades', push: '/student/ViewGrades' },
      ];
      return (
            <div className={styles.viewGradesPageContainer}>
                  <SideNavBar className={styles.navbarContainer} items={navBarItems} highlighted={focus} />
                  <ViewGrades className={styles.viewGrades} />
            </div>
      );
}

export default ViewGradesContainer;
