import React from 'react';
import styles from './announcementPageContainer.module.css';
import SideNavBar from '../Layout/SideNavBar';
import AnnouncementPage from './AnnouncementPage';
function AnnouncementPageContainer(props) {
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
            <div className={styles.announcementPageContainer}>
                  <SideNavBar
                        className={styles.navbarContainer}
                        items={navBarItems}
                        highlighted={focus}
                  />
                  <AnnouncementPage
                        className={styles.announcements}
                        announcements={props.anncs}
                  />
            </div>
      );
}

export default AnnouncementPageContainer;
