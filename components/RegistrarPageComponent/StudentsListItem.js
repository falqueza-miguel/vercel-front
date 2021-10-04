import React from 'react';
import styles from './studentsListItem.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

function StudentsListItem(props) {
    console.log(props.data);
    return (
        <Link href={`/registrar/Students/${props.data._id}`} passHref>
            <li className={styles.itemContainer}>
                <a className={styles.userName}>
                    {props.data.lastName}, {props.data.firstName} {props.data.middleName}
                </a>
                <p className={styles.returning}>
                    Grade&nbsp;
                    {props.data.yearLevel}
                </p>
            </li>
        </Link>
    );
}

export default StudentsListItem;
