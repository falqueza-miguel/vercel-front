import React, { useState, useEffect } from 'react';
import styles from './sectionPage.module.css';
import SectionItem from './SectionItem';
import Button from '../UI/Button';
import axios from 'axios';
import { useRouter } from 'next/router';

function SectionPage(props) {
    const [data, setData] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/teacher/mysections`, {
                    withCredentials: true,
                });
                setData(response.data.sections_list);
                console.log(response.data.sections_list);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);
    const [search, setSearch] = useState('');
    const [yearLevel, setYearLevel] = useState('all');

    const searchBarHandler = (event) => {
        setSearch(event.target.value);
    };

    const filter = (list) => {
        if (yearLevel === 'all') {
            return list.filter((data) => data.name.toLowerCase().indexOf(search) > -1);
        } else {
            return list.filter((data) => data.yearLevel == yearLevel && data.name.toLowerCase().indexOf(search) > -1);
        }
    };
    console.log(search);
    const yearLevelHandler = (event) => {
        setYearLevel(event.target.value);
    };
    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Encode Grades</h1>
            <div className={styles.filterContainer}>
                <div className={styles.select}>
                    <p className={styles.dropdownName}> Grade:</p>
                    <select name="yearlevel" id="yearlevel" onChange={yearLevelHandler}>
                        <option value="all">All</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                    </select>
                </div>

                <input className={styles.input} type="search" name="searchbar" id="searchbar" placeholder="Search lastname" onChange={searchBarHandler} value={props.searchBind} />
            </div>
            <div className={styles.columnName}>Sections</div>
            <ul className={styles.listContainer}>
                <div className={styles.columnTitlecontainer}>
                    <h4 className={styles.name}>Name</h4>
                    <h4 className={styles.name}>Grade</h4>
                    <h4 className={styles.name}>Subject</h4>
                </div>

                {filter(data).map((item, i) => (
                    <SectionItem key={i} data={item} />
                ))}
            </ul>
        </div>
    );
}

export default SectionPage;
