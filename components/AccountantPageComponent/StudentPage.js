import React, { useState, useEffect } from 'react';
import styles from './studentPage.module.css';
import StudentItem from './StudentItem';
import axios from 'axios';
import { useRouter } from 'next/router';

function StudentPage() {
    const [data, setData] = useState([]);

    const [search, setSearch] = useState('');
    const [yearLevel, setYearLevel] = useState('all');
    const searchBarHandler = (event) => {
        setSearch(event.target.value);
    };
    const filter = (list) => {
        if (yearLevel === 'all') {
            return list.filter((data) => data.lastName.toLowerCase().indexOf(search) > -1);
        } else {
            return list.filter((data) => data.yearLevel === yearLevel && data.lastName.toLowerCase().indexOf(search) > -1);
        }
    };

    const yearLevelHandler = (event) => {
        setYearLevel(event.target.value);
    };
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/accountant/students`, {
                    withCredentials: true,
                });
                setData(response.data.users);
                console.log(response.data.users);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>List of Students</h1>
            <div className={styles.filterContainer}>
                <div className={styles.select}>
                    <p className={styles.dropdownName}>Year Level:</p>
                    <select name="yearLevel" id="yearLevel" onChange={yearLevelHandler}>
                        <option value="all">All</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                    </select>
                </div>
                <input className={styles.input} type="search" name="searchbar" id="searchbar" placeholder="Search section name" onChange={searchBarHandler} />
            </div>
            <div className={styles.columnName}>Students</div>
            <ul className={styles.listContainer}>
                <div className={styles.columnTitlecontainer}>
                    <h4 className={styles.name}>Name</h4>
                    <h4 className={styles.name}>LRN</h4>
                    <h4 className={styles.name}></h4>
                </div>

                {filter(data).map((item, i) => (
                    <StudentItem key={i} data={item} />
                ))}
            </ul>
        </div>
    );
}

export default StudentPage;
