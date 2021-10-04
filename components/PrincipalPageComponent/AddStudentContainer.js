import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import SideNavBar from '../Layout/SideNavBar';
import styles from './addStudentContainer.module.css';
import AddStudent from './AddStudent';

function AddStudentContainer() {
    const router = useRouter();
    const id = router.query.id;
    const [sectionInfo, setSectionInfo] = useState([]);
    const [studentArray, setStudentArray] = useState([]);
    const [studentList, setStudentList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/principal/sections/${id}`, {
                    withCredentials: true,
                });
                //   const datax = await response.data.section;
                const res = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/principal/sectionAdd/${id}/${response.data.section.yearLevel}`, {
                    withCredentials: true,
                });
                setSectionInfo(response.data.section);

                setStudentArray(response.data.section.studentNames);

                setStudentList(res.data.users);
                // console.log(res.data.users);
                // console.log(response.data.section);
                // console.log(response.data.section.studentNames);
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [id]);
    const navBarItems = [
        { id: 1, title: 'Profile', push: '/principal' },
        {
            id: 2,
            title: 'Announcement',
            push: '/principal/Announcement',
        },
        { id: 3, title: 'Sections', push: '/principal/Section' },
        { id: 4, title: 'Teachers', push: '/principal/Teacher' },
    ];
    return (
        <div>
            <div className={styles.addStudentContainer}>
                <SideNavBar className={styles.navbarContainer} items={navBarItems} />
                <AddStudent className={styles.createSection} data={sectionInfo} stud={studentArray} allstud={studentList} />
            </div>
        </div>
    );
}

export default AddStudentContainer;
