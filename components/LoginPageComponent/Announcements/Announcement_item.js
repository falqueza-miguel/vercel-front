import React from 'react';

import styles from './announcement_item.module.css';
function Announcement_item(props) {
      return (
            <li className={styles.announcementContainer}>
                  <div className={styles.title}>
                        <h1>{props.title}</h1>
                        <h4 className={styles.date}>{props.date}</h4>
                  </div>
                  <div className={styles.announcement}>
                        <p>{props.content}</p>
                  </div>
            </li>
      );
}

export default React.memo(Announcement_item);
