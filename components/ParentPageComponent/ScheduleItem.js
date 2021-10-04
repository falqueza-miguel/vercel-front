import React from 'react';
import styles from './scheduleItem.module.css';

function ScheduleItem(props) {
      return (
            <li className={styles.itemContainer}>
                  <div className={styles.userName}>{props.data.subject}</div>
                  <div className={styles.userName}>{props.data.teacher}</div>
                  <div className={styles.userName}>{props.data.schedule}</div>
            </li>
      );
}

export default ScheduleItem;
