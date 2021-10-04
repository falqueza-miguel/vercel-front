import React from 'react';
import Announcement_item from './Announcement_item';
import styles from './announcements.module.css';

function Announcements(props) {
    console.log(props.announcements);

    return (
        <div className={props.className}>
            <ul className={styles.announcements}>
                <h1 className={styles.announcement_header}>ANNOUNCEMENTS</h1>

                {props.announcements.map((item) => (
                    <Announcement_item key={item._id} title={item.title} date={item.createdAt.toLocaleString().slice(0, 10)} content={item.content} />
                ))}
            </ul>
        </div>
    );
}

export default React.memo(Announcements);
