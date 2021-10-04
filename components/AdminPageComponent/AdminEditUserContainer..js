import React, { useState } from 'react';
import SideNavBar from '../Layout/SideNavBar';
import styles from './adminEditUserContainer.module.css';
import AdminEditUser from './AdminEditUser';

function EditUserContainer(props) {
      const navBarItems = [
            { id: 1, title: 'Profile', push: '/admin' },
            { id: 3, title: 'List of users', push: `/admin/AdminViewUser` },
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
      }

      return (
            <div className={styles.editUserContainer}>
                  <SideNavBar
                        className={styles.navbarContainer}
                        items={navBarItems}
                  />
                  <AdminEditUser
                        className={styles.editUser}
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

export default EditUserContainer;
