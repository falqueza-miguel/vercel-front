import React from 'react';
import styles from './preRegistrationListItem.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

function PreRegistrationListItem(props) {
    console.log(props.data);
    return (
        <Link href={`/registrar/PreRegistration/${props.data._id}`} passHref>
            <li className={styles.itemContainer}>
                <a className={styles.userName}>
                    {props.data.studentLastName}, {props.data.studentFirstName} {props.data.studentMiddleName}
                </a>
                <p className={styles.returning}>Grade {props.data.levelEnroll}</p>
            </li>
        </Link>
    );
}

export default PreRegistrationListItem;
