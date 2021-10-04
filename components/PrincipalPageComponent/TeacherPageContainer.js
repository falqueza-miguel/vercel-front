import React from 'react';
import styles from './teacherPageContainer.module.css';
import SideNavBar from '../Layout/SideNavBar';
import TeacherPage from './TeacherPage';

function TeacherPageContainer(props) {
      const focus = 'fourth';
      const navBarItems = [
            { id: 1, title: 'Profile', push: '/principal' },
            {
                  id: 2,
                  title: 'Announcement',
                  push: '/principal/Announcement',
            },
            { id: 3, title: 'Sections', push: '/principal/Section' },
            { id: 4, title: 'Teachers', push: '/principal/Teacher' },
      ];
      return (
            <div className={styles.teacherPageContainer}>
                  <SideNavBar
                        className={styles.navbarContainer}
                        items={navBarItems}
                        highlighted={focus}
                  />
                  <TeacherPage className={styles.teachers} data={props.data} />
            </div>
      );
}

export default TeacherPageContainer;
