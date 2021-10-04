import React, { useState, useEffect } from 'react';
import styles from './schedulePage.module.css';
import ScheduleItem from './ScheduleItem';
import axios from 'axios';
import { useRouter } from 'next/router';

function SchedulePage(props) {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/teacher/myschedule`, {
                    withCredentials: true,
                });
                setData(response.data.scheds);
                console.log(response.data.scheds);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Schedule</h1>

            <div className={styles.columnName}>Schedule</div>
            <ul className={styles.listContainer}>
                <div className={styles.columnTitlecontainer}>
                    <h4 className={styles.name}>Subject</h4>
                    <h4 className={styles.name}>Section</h4>
                    <h4 className={styles.name}>Schedule</h4>
                </div>

                {data.map((item, i) => (
                    <ScheduleItem key={i} data={item} />
                ))}
            </ul>
        </div>
    );
}

export default SchedulePage;
