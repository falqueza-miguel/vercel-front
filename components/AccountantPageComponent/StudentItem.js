import React from 'react';
import styles from './studentItem.module.css';
import { useRouter } from 'next/router';
function StudentItem(props) {
      const router = useRouter();
      return (
            <li className={styles.itemContainer}>
                  <div className={styles.userName}>
                        {props.data.lastName}, {props.data.firstName} {props.data.middleName}
                  </div>
                  <div className={styles.userName}>{props.data.LRNNo}</div>
                  <div className={styles.userName}>
                        <button
                              className={styles.button}
                              onClick={() => {
                                    router.push(`/accountant/Students/${props.data._id}`);
                              }}
                        >
                              Edit
                        </button>
                  </div>
            </li>
      );
}

export default StudentItem;
