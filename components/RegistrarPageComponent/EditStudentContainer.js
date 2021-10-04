import React, { useState } from 'react';
import SideNavBar from '../Layout/SideNavBar';
import styles from './editStudentContainer.module.css';
import EditStudentX from './EditStudentX';

function EditStudentContainer(props) {
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
      console.log(props.userInfo);

      return (
            <div className={styles.editUserContainer}>
                  <SideNavBar
                        className={styles.navbarContainer}
                        items={navBarItems}
                  />
                  <EditStudentX
                        className={styles.editUser}
                        id={props.data._id}
                        fname={props.data.firstName}
                        mname={props.data.middleName}
                        lname={props.data.lastName}
                        email={props.data.email}
                        number={props.data.phoneNum}
                        role={convertedRole}
                        data={props.data}
                        userInfo={props.userInfo}
                        isSelectedUser={true}
                  />
            </div>
      );
}

export default EditStudentContainer;
