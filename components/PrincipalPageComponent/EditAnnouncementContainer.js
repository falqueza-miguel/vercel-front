import React, { useState } from 'react';
import SideNavBar from '../Layout/SideNavBar';
import styles from './editAnnouncementContainer.module.css';
import EditAnnouncement from './EditAnnouncement';

function EditAnnouncementContainer(props) {
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
        <div className={styles.editAnncContainer}>
            <SideNavBar className={styles.navbarContainer} items={navBarItems} highlighted={focus} />
            <EditAnnouncement id={props.id} />
        </div>
    );
}

export default EditAnnouncementContainer;
