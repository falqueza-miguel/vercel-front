import React from 'react';
import styles from './sectionItem.module.css';
import { useRouter } from 'next/router';
function SectionItem(props) {
      const router = useRouter();
      return (
            <div>
                  <li className={styles.itemContainer}>
                        <a className={styles.userName}>{props.data.sectionName}</a>
                        <div className={styles.roleName}>
                              <button
                                    className={styles.editButton}
                                    onClick={() => {
                                          router.push(`/principal/Section/EditSection/${props.data._id}`);
                                    }}
                              >
                                    Edit Section
                              </button>
                              <button
                                    className={styles.editButton}
                                    onClick={() => {
                                          router.push(`/principal/Section/AddStudent/${props.data._id}`);
                                    }}
                              >
                                    Add Students
                              </button>
                        </div>
                  </li>
            </div>
      );
}

export default SectionItem;
