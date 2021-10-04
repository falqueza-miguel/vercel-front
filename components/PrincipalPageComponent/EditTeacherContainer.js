import React, { useState } from 'react';
import SideNavBar from '../Layout/SideNavBar';
import styles from './editTeacherContainer.module.css';
import EditTeacher from './EditTeacher';

function EditTeacherContainer(props) {
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
            <div className={styles.editUserContainer}>
                  <SideNavBar
                        className={styles.navbarContainer}
                        items={navBarItems}
                  />
                  <EditTeacher data={props.data} />
            </div>
      );
}

export default EditTeacherContainer;
