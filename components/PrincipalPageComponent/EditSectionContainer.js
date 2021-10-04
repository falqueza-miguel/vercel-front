import React, { useState } from 'react';
import SideNavBar from '../Layout/SideNavBar';
import styles from './editSectionContainer.module.css';
import EditSection from './EditSection';

function EditSectionContainer() {
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
            <div className={styles.editSectionContainer}>
                  <SideNavBar className={styles.navbarContainer} items={navBarItems} />
                  <EditSection />
            </div>
      );
}

export default EditSectionContainer;
