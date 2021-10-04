import React, { useState } from 'react';
import SideNavBar from '../Layout/SideNavBar';

import styles from './createUserContainer.module.css';

import CreateUser from './CreateUser';

function CreateUserContainer() {
      const navBarItems = [
            { id: 1, title: 'Profile', push: '/admin' },

            { id: 3, title: 'List of users', push: `/admin/AdminViewUser` },
      ];
      return (
            <div className={styles.createUserContainer}>
                  <SideNavBar
                        className={styles.navbarContainer}
                        items={navBarItems}
                  />
                  <CreateUser className={styles.createUser} />
            </div>
      );
}

export default CreateUserContainer;
