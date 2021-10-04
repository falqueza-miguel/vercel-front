import styles from './studentProfilePageContainer.module.css';
import React, { useState } from 'react';
import SideNavBar from '../Layout/SideNavBar';

import StudentProfilePage from './StudentProfilePage';

function StudentProfilePageContainer(props) {
      const navBarItems = [
            { id: 1, title: 'Profile', push: '/registrar' },
            {
                  id: 2,
                  title: 'Pre-Registration',
                  push: '/registrar/PreRegistration',
            },
            { id: 3, title: 'Students', push: `/registrar/Students` },
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
                  />
                  <StudentProfilePage
                        id={props.data._id}
                        fname={props.data.firstName}
                        mname={props.data.middleName}
                        lname={props.data.lastName}
                        email={props.data.email}
                        number={props.data.phoneNum}
                        role={convertedRole}
                        isSelectedUser={true}
                  />
            </div>
      );
}

export default StudentProfilePageContainer;
