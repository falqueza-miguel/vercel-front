import React, { useState } from 'react';
import SideNavBar from '../Layout/SideNavBar';
import styles from './studentsListContainer.module.css';
import StudentsList from './StudentsList';

function StudentsListContainer(props) {
      const focus = 'third';
      const navBarItems = [
            { id: 1, title: 'Profile', push: '/registrar' },
            {
                  id: 2,
                  title: 'Pre-Registration',
                  push: '/registrar/PreRegistration',
            },
            { id: 3, title: 'Students', push: `/registrar/Students` },
      ];
      return (
            <div className={styles.studentsListContainer}>
                  <SideNavBar
                        className={styles.navbarContainer}
                        items={navBarItems}
                        highlighted={focus}
                  />
                  <StudentsList
                        className={styles.displayFieldContainer}
                        data={props.data}
                  />
            </div>
      );
}

export default StudentsListContainer;
