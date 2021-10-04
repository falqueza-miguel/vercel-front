import React from 'react';
import styles from './sectionItem.module.css';
import { useRouter } from 'next/router';
import Button from '../UI/Button';
function SectionItem(props) {
      const router = useRouter();
      return (
            <li className={styles.itemContainer}>
                  <div className={styles.userName}>{props.data.name}</div>
                  <div className={styles.userName}>{props.data.yearLevel}</div>
                  <div className={styles.userName}>{props.data.subject}</div>
                  <button
                        className={styles.encodeButton}
                        onClick={() => {
                              router.push(`/teacher/Sections/${props.data.id}?subject=${props.data.subject}`);
                        }}
                  >
                        Encode Grade
                  </button>
            </li>
      );
}

export default SectionItem;
