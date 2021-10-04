import React, { useState } from 'react';
import SideNavBar from '../Layout/SideNavBar';
import styles from './createSectionContainer.module.css';
import CreateSection from './CreateSection';

function CreateSectionContainer() {
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
            <div>
                  <div className={styles.createSectionContainer}>
                        <SideNavBar
                              className={styles.navbarContainer}
                              items={navBarItems}
                        />
                        <CreateSection className={styles.createSection} />
                  </div>
            </div>
      );
}

export default CreateSectionContainer;
