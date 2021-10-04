import React, { useState } from 'react';
import styles from './adminDisplayField.module.css';
import Button from '../UI/Button';
import AdminDisplayFieldItem from './AdminDisplayFieldItem';
import { useRouter } from 'next/router';
function AdminDisplayField(props) {
    console.log(props.data);
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [role, setRole] = useState('all');

    const searchBarHandler = (event) => {
        setSearch(event.target.value);
    };

    const filter = (list) => {
        if (role === 'all') {
            return list.filter((data) => data.lastName.toLowerCase().indexOf(search) > -1);
        } else {
            return list.filter((data) => data.role == role && data.lastName.toLowerCase().indexOf(search) > -1);
        }
    };
    console.log(search);
    const roleHandler = (event) => {
        setRole(event.target.value);
    };
    console.log(role);

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Users</h1>
            <div className={styles.createButtonContainer}>
                <Button
                    className={styles.createButton}
                    onClick={() => {
                        router.push('/admin/AdminCreateUser');
                    }}
                >
                    &#65291; Create User
                </Button>
            </div>
            <div className={styles.filterContainer}>
                <div className={styles.select}>
                    <p className={styles.dropdownName}> Role:</p>
                    <select name="role" id="role" onChange={roleHandler}>
                        <option value="all">All</option>
                        <option value="0">Admin</option>
                        <option value="1">Principal</option>
                        <option value="2">Accountant</option>
                        <option value="3">Registrar</option>
                    </select>
                </div>

                <input className={styles.input} type="search" name="searchbar" id="searchbar" placeholder="Search lastname" onChange={searchBarHandler} value={props.searchBind} />
            </div>
            <div className={styles.columnName}>Users</div>
            <ul className={styles.listContainer}>
                <h4 className={styles.name}>Name</h4>
                {filter(props.data).map((item) => (
                    <AdminDisplayFieldItem key={item._id} id={item._id} fname={item.firstName} mname={item.middleName} lname={item.lastName} email={item.email} role={item.role} />
                ))}
            </ul>
        </div>
    );
}

export default AdminDisplayField;
