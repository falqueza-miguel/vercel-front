import React from 'react';
import styles from './profilePage.module.css';

function ProfilePage(props) {
      return (
            <div className={styles.container}>
                  <h1 className={styles.header}>User Profile</h1>
                  <div className={styles.profileContainer}>
                        <div className={styles.profileField}>
                              <p className={styles.label}>First Name</p>
                              <p className={styles.field}>{props.fname}</p>
                        </div>
                        <div className={styles.profileField}>
                              <p className={styles.label}>Middle Name</p>
                              <p className={styles.field}>{props.mname}</p>
                        </div>
                        <div className={styles.profileField}>
                              <p className={styles.label}>Last Name</p>
                              <p className={styles.field}>{props.lname}</p>
                        </div>
                        <div className={styles.profileField}>
                              <p className={styles.label}>Email</p>
                              <p className={styles.field}>{props.email}</p>
                        </div>
                        <div className={styles.profileField}>
                              <p className={styles.label}>Cellphone No.</p>
                              <p className={styles.field}>{props.number}</p>
                        </div>
                        <div className={styles.profileField}>
                              <p className={styles.label}>Role</p>
                              <p className={styles.field}>{props.role}</p>
                        </div>
                  </div>
            </div>
      );
}

export default ProfilePage;
