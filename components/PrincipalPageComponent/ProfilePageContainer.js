import styles from './profilePageContainer.module.css';
import React, { useState } from 'react';
import SideNavBar from '../Layout/SideNavBar';
import ProfilePage from './ProfilePage';

function ProfilePageContainer(props) {
      const focus = 'first';
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
      let convertedRole = '';
      if (props.data.role === 0) {
            convertedRole = 'Admin';
      } else if (props.data.role === 1) {
            convertedRole = 'Principal';
      } else if (props.data.role === 2) {
            convertedRole = 'Accountant';
      } else if (props.data.role === 3) {
            convertedRole = 'Registrar';
      } else if (props.data.role === 4) {
            convertedRole = 'Teacher';
      } else if (props.data.role === 5) {
            convertedRole = 'Parent';
      } else if (props.data.role === 6) {
            convertedRole = 'Student';
      }
      return (
            <div className={styles.profilePageContainer}>
                  <SideNavBar
                        className={styles.navbarContainer}
                        items={navBarItems}
                        highlighted={focus}
                  />
                  <ProfilePage
                        fname={props.data.firstName}
                        mname={props.data.middleName}
                        lname={props.data.lastName}
                        email={props.data.email}
                        number={props.data.phoneNum}
                        role={convertedRole}
                        isSelectedUser={false}
                  />
            </div>
      );
}

export default ProfilePageContainer;
