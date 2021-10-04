import React from 'react';
import styles from './announcementPage.module.css';
import AnnouncementItem from './AnnouncementItem';
import Button from '../UI/Button';
import { useRouter } from 'next/router';
function AnnouncementPage(props) {
      const router = useRouter();
      console.log(props.announcements);
      return (
            <div className={styles.container}>
                  <h1 className={styles.header}>Announcements</h1>
                  <div className={styles.createButtonContainer}>
                        <Button
                              className={styles.createButton}
                              onClick={() => {
                                    router.push(
                                          '/principal/Announcement/CreateAnnouncement'
                                    );
                              }}
                        >
                              &#65291; Create Announcement
                        </Button>
                  </div>
                  <div className={styles.columnName}>Announcements</div>
                  <ul className={styles.listContainer}>
                        <h4 className={styles.name}>Title</h4>
                        {props.announcements.map((item) => (
                              <AnnouncementItem key={item._id} data={item} />
                        ))}
                  </ul>
            </div>

            /* <ul className={styles.announcements}>
                        <h1 className={styles.announcement_header}>
                              ANNOUNCEMENTS
                        </h1>

                        {props.announcements.map((item) => (
                              <AnnouncementItem
                                    key={item._id}
                                    title={item.title}
                                    date={item.createdAt
                                          .toLocaleString()
                                          .slice(0, 10)}
                                    content={item.content}
                              />
                        ))}
                  </ul> */
      );
}

export default AnnouncementPage;
