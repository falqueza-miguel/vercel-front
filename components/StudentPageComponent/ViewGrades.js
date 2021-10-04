import React, { useState, useEffect } from 'react';
import styles from './viewGrades.module.css';
import { useRouter } from 'next/router';
import axios from 'axios';
import Modal from '../../components/Layout/Modal.';
import Button from '../UI/Button';
import Link from 'next/link';
function ViewGrades() {
    const [studentGrade, setStudentGrade] = useState([]);
    const [prevGrade, setPrevGrade] = useState([]);
    const [studentGradeInfo, setStudentGradeInfo] = useState('');
    const [prevGradeInfo, setPrevGradeInfo] = useState([]);
    const [showPrevGradeHandler, setShowPrevGradeHandler] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/student/grades`, {
                    withCredentials: true,
                });
                console.log(response.data);
                setPrevGradeInfo(response.data.gradesInfo);
                setStudentGrade(response.data.gradeLatest);
                setPrevGrade(response.data.grades);
                setStudentGradeInfo(response.data.gradeLatestInfo);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const setShowPrevGradeClickHandler = (e, index) => {
        const list = [...showPrevGradeHandler];
        list[index] = e;
        setShowPrevGradeHandler(list);
        console.log(list);
    };
    return (
        <div className={styles.container}>
            <h1 className={styles.header}>View Grades</h1>
            <div className={styles.columnName}>{studentGradeInfo.sectionName}</div>
            {studentGradeInfo.sectionYearLevel !== '12' && studentGradeInfo.sectionYearLevel !== '11' ? (
                <ul className={styles.listContainer}>
                    <div className={styles.columnTitlecontainer}>
                        <h4 className={styles.name}>Subject</h4>
                        <h4 className={styles.name}>Q1</h4>
                        <h4 className={styles.name}>Q2</h4>
                        <h4 className={styles.name}>Q3</h4>
                        <h4 className={styles.name}>Q4</h4>
                        <h4 className={styles.name}>Final</h4>
                        <h4 className={styles.name}>Mark</h4>
                    </div>

                    {studentGrade.map((item, i) => (
                        <li className={styles.itemContainer} key={i}>
                            <div className={styles.userName}>{item.subject}</div>
                            <div className={styles.quarterGrade}>{item.q1Grade}</div>
                            <div className={styles.quarterGrade}>{item.q2Grade}</div>
                            <div className={styles.quarterGrade}>{item.q3Grade}</div>
                            <div className={styles.quarterGrade}>{item.q4Grade}</div>
                            <div className={styles.quarterGrade}>{item.computedGrade}</div>
                            <div className={styles.quarterGrade}>{item.remark}</div>
                        </li>
                    ))}
                </ul>
            ) : (
                <ul className={styles.listContainer2}>
                    <div className={styles.columnTitlecontainer2}>
                        <h4 className={styles.name2}>Student Name</h4>
                        <h4 className={styles.name2}>1st Term</h4>
                        <h4 className={styles.name2}>2nd Term</h4>
                        <h4 className={styles.name2}>Final</h4>
                        <h4 className={styles.name2}>Mark</h4>
                    </div>

                    {studentGrade.map((item, i) => (
                        <li className={styles.itemContainer2} key={i}>
                            <div className={styles.userName2}>{item.subject}</div>
                            <div className={styles.quarterGrade2}>{item.q1Grade}</div>
                            <div className={styles.quarterGrade2}>{item.q2Grade}</div>
                            <div className={styles.quarterGrade}>{item.computedGrade}</div>
                            <div className={styles.quarterGrade}>{item.remark}</div>
                        </li>
                    ))}
                </ul>
            )}

            {prevGrade.map((item, i) => (
                <div key={i} className={styles.prevGradeContainer}>
                    <div
                        className={showPrevGradeHandler[i] ? styles.columnNamePrevGradeClicked : styles.columnNamePrevGrade}
                        onClick={() => {
                            setShowPrevGradeClickHandler(!showPrevGradeHandler[i], i);
                        }}
                    >
                        {prevGradeInfo[i].sectionName}
                    </div>
                    {prevGradeInfo[i].sectionYearLevel !== '12' && prevGradeInfo[i].sectionYearLevel !== '11'
                        ? showPrevGradeHandler[i] && (
                              <ul className={styles.listContainer}>
                                  <div className={styles.columnTitlecontainer}>
                                      <h4 className={styles.name}>Subject</h4>
                                      <h4 className={styles.name}>Q1</h4>
                                      <h4 className={styles.name}>Q2</h4>
                                      <h4 className={styles.name}>Q3</h4>
                                      <h4 className={styles.name}>Q4</h4>
                                      <h4 className={styles.name}>Final</h4>
                                      <h4 className={styles.name}>Mark</h4>
                                  </div>

                                  {item.map((x, y) => (
                                      <li className={styles.itemContainer} key={y}>
                                          <div className={styles.userName}>{x.subject}</div>
                                          <div className={styles.quarterGrade}>{x.q1Grade}</div>
                                          <div className={styles.quarterGrade}>{x.q2Grade}</div>
                                          <div className={styles.quarterGrade}>{x.q3Grade}</div>
                                          <div className={styles.quarterGrade}>{x.q4Grade}</div>
                                          <div className={styles.quarterGrade}>{x.computedGrade}</div>
                                          <div className={styles.quarterGrade}>{x.remark}</div>
                                      </li>
                                  ))}
                              </ul>
                          )
                        : showPrevGradeHandler[i] && (
                              <ul className={styles.listContainer2}>
                                  <div className={styles.columnTitlecontainer2}>
                                      <h4 className={styles.name2}>Student Name</h4>
                                      <h4 className={styles.name2}>1st Term</h4>
                                      <h4 className={styles.name2}>2nd Term</h4>
                                      <h4 className={styles.name2}>Final</h4>
                                      <h4 className={styles.name2}>Mark</h4>
                                  </div>

                                  {item.map((x, y) => (
                                      <li className={styles.itemContainer2} key={y}>
                                          <div className={styles.userName2}>{x.subject}</div>
                                          <div className={styles.quarterGrade2}>{x.q1Grade}</div>
                                          <div className={styles.quarterGrade2}>{x.q2Grade}</div>
                                          <div className={styles.quarterGrade}>{x.computedGrade}</div>
                                          <div className={styles.quarterGrade}>{x.remark}</div>
                                      </li>
                                  ))}
                              </ul>
                          )}
                </div>
            ))}
        </div>
    );
}

export default ViewGrades;
