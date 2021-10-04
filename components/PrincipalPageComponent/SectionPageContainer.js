import React from 'react';
import styles from './sectionPageContainer.module.css';
import SideNavBar from '../Layout/SideNavBar';
import SectionPage from './SectionPage';

function SectionPageContainer(props) {
      const focus = 'third';
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
            <div className={styles.sectionPageContainer}>
                  <SideNavBar
                        className={styles.navbarContainer}
                        items={navBarItems}
                        highlighted={focus}
                  />
                  <SectionPage className={styles.section} data={props.data} />
            </div>
      );
}

export default SectionPageContainer;
