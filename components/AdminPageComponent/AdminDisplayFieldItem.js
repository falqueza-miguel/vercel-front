import React from 'react';
import styles from './adminDisplayFieldItem.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
function AdminDisplayFieldItem(props) {
    let convertedRole = '';
    if (props.role === 0) {
        convertedRole = 'Admin';
    } else if (props.role === 1) {
        convertedRole = 'Principal';
    } else if (props.role === 2) {
        convertedRole = 'Accountant';
    } else if (props.role === 3) {
        convertedRole = 'Registrar';
    } else if (props.role === 4) {
        convertedRole = 'Teacher';
    } else if (props.role === 5) {
        convertedRole = 'Parent';
    } else if (props.role === 6) {
        convertedRole = 'Student';
    }
    return (
        <Link href={`/admin/AdminViewUser/${props.id} `} passHref>
            <li className={styles.itemContainer}>
                <a className={styles.userName}>
                    {props.lname}, {props.fname} {props.mname}
                </a>
                <p className={styles.roleName}>{convertedRole}</p>
            </li>
        </Link>
    );
}

export default AdminDisplayFieldItem;
