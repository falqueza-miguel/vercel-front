import React from 'react';
import styles from './announcementItem.module.css';
import Link from 'next/link';
function AnnouncementItem(props) {
    console.log(props.data);
    return (
        <Link href={`/principal/Announcement/${props.data._id}`} passHref>
            <li className={styles.itemContainer}>
                <a className={styles.userName}>{props.data.title}</a>
                <p className={styles.returning}>{props.data.createdAt.toLocaleString().slice(0, 10)}</p>
            </li>
        </Link>
    );
}

export default React.memo(AnnouncementItem);
