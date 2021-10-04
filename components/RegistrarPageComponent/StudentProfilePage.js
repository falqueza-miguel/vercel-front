import React from 'react';
import styles from './studentProfilePage.module.css';
import Button from '../UI/Button';
import { useRouter } from 'next/router';
function StudentProfilePage(props) {
      const router = useRouter();
      return (
            <div className={styles.container}>
                  <h1 className={styles.header}>Student Profile</h1>
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
                        {props.isSelectedUser && (
                              <Button
                                    className={styles.button}
                                    onClick={(e) => {
                                          router.push(
                                                `/registrar/EditStudent/${props.id}`
                                          );
                                    }}
                              >
                                    Edit Student
                              </Button>
                        )}
                  </div>
            </div>
      );
}

export default StudentProfilePage;
