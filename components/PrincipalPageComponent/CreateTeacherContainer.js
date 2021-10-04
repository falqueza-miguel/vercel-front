import React, { useState } from 'react';
import SideNavBar from '../Layout/SideNavBar';
import styles from './createTeacherContainer.module.css';
import CreateTeacher from './CreateTeacher';
function CreateTeacherContainer() {
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
            <div className={styles.createTeacherContainer}>
                  <SideNavBar
                        className={styles.navbarContainer}
                        items={navBarItems}
                  />
                  <CreateTeacher className={styles.createTeacher} />
            </div>
      );
}

export default CreateTeacherContainer;
