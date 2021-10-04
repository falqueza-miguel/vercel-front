import React, { useState } from 'react';
import SideNavBar from '../Layout/SideNavBar';
import styles from './createAnnouncementContainer.module.css';
import CreateAnnouncement from './CreateAnnouncement';

function CreateAnnouncementContainer() {
      const focus = 'second';
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
            <div className={styles.createAnnouncementContainer}>
                  <SideNavBar
                        className={styles.navbarContainer}
                        items={navBarItems}
                        highlighted={focus}
                  />
                  <CreateAnnouncement className={styles.createAnnouncement} />
            </div>
      );
}

export default CreateAnnouncementContainer;
