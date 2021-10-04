import React, { useState, useEffect } from 'react';
import styles from './encodeGrades.module.css';
import useInput from '../hooks/useInput';
import { useRouter } from 'next/router';
import axios from 'axios';
import Modal from '../../components/Layout/Modal.';
import Button from '../UI/Button';

function EncodeGrades(props) {
    const router = useRouter();
    const id = router.query.id;
    const subject = router.query.subject;
    const [valid, setValid] = useState(false);

    const [sectionData, setSectionData] = useState([]);
    const [studentData, setStudentData] = useState([]);
    const [search, setSearch] = useState('');

    //value of each q1

    const searchBarHandler = (event) => {
        setSearch(event.target.value);
    };
    const filter = (list) => {
        return list.filter((data) => data.name.toLowerCase().indexOf(search) > -1);
    };
    console.log(id);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/teacher/mysections/${id}?subject=${subject}`, {
                    withCredentials: true,
                });

                setSectionData(response.data.section);
                setStudentData(response.data.students_list);
                console.log(response.data.students_list);
                for (let x = 0; x < response.data.students_list.length; x++) {
                    if (response.data.section.yearLevel !== '12' && response.data.section.yearLevel !== '11') {
                        const list = [...response.data.students_list];
                        if (list[x]['q1Grade'] !== '' && list[x]['q2Grade'] !== '' && list[x]['q3Grade'] !== '' && list[x]['q4Grade'] !== '') {
                            list[x]['computedGrade'] = ((Number(list[x]['q1Grade']) + Number(list[x]['q2Grade']) + Number(list[x]['q3Grade']) + Number(list[x]['q4Grade'])) / 4).toString();
                            setStudentData(list);
                        } else {
                            list[x]['computedGrade'] = '';
                        }
                    } else {
                        const list = [...response.data.students_list];
                        if (list[x]['q1Grade'] !== '' && list[x]['q2Grade'] !== '') {
                            list[x]['computedGrade'] = ((Number(list[x]['q1Grade']) + Number(list[x]['q2Grade'])) / 2).toString();
                            setStudentData(list);
                        } else {
                            list[x]['computedGrade'] = '';
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [id, subject]);

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...studentData];
        list[index][name] = value;
        setStudentData(list);
    };

    const computeGradeHandler = (e, index) => {
        const list = [...studentData];
        if (list[index]['q1Grade'] !== '' && list[index]['q2Grade'] !== '' && list[index]['q3Grade'] !== '' && list[index]['q4Grade'] !== '') {
            list[index]['computedGrade'] = ((Number(list[index]['q1Grade']) + Number(list[index]['q2Grade']) + Number(list[index]['q3Grade']) + Number(list[index]['q4Grade'])) / 4).toString();
            setStudentData(list);
        } else {
            list[index]['computedGrade'] = '';
        }
    };
    const computeGradeHandler2 = (e, index) => {
        const list = [...studentData];
        if (list[index]['q1Grade'] !== '' && list[index]['q2Grade'] !== '') {
            list[index]['computedGrade'] = ((Number(list[index]['q1Grade']) + Number(list[index]['q2Grade'])) / 2).toString();
            setStudentData(list);
        } else {
            list[index]['computedGrade'] = '';
        }
    };
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const gradeData = { students: studentData };
        console.log(gradeData);
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/teacher/mysections/${id}?subject=${subject}`, gradeData, {
                withCredentials: true,
            });
            console.log(response.data);
            if (response.data.success) {
                setValid(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form className={styles.container} onSubmit={onSubmitHandler}>
            <h1 className={styles.header}>Section Info</h1>
            <div className={styles.formWrapper}>
                <div className={styles.formContainer}>
                    <div className={styles.formFields}>
                        <div className={styles.labelContainer}>
                            <label htmlFor="schoolYearFrom" className={styles.label}>
                                School Year From
                            </label>
                        </div>
                        <div className={styles.inputContainer}>
                            <div className={styles.input}>{sectionData.schoolYearFrom}</div>
                        </div>
                    </div>
                    <div className={styles.formFields}>
                        <div className={styles.labelContainer}>
                            <label htmlFor="schoolYearTo" className={styles.label}>
                                School Year To
                            </label>
                        </div>
                        <div className={styles.inputContainer}>
                            <div className={styles.input}>{sectionData.schoolYearTo}</div>
                        </div>
                    </div>

                    <div className={styles.formFields}>
                        <div className={styles.labelContainer}>
                            <label htmlFor="sectionName" className={styles.label}>
                                Section Name
                            </label>
                        </div>
                        <div className={styles.inputContainer}>
                            <div className={styles.input}>{sectionData.sectionName}</div>
                        </div>
                    </div>
                    <div className={styles.formFields}>
                        <div className={styles.labelContainer}>
                            <label htmlFor="yearLevel" className={styles.label}>
                                Grade Level
                            </label>
                        </div>

                        <div className={styles.inputContainer}>
                            <div className={styles.input}>{sectionData.yearLevel}</div>
                        </div>
                    </div>
                    {sectionData.strand && (
                        <div className={styles.formFields}>
                            <div className={styles.labelContainer}>
                                <label htmlFor="strand" className={styles.label}>
                                    Strand
                                </label>
                            </div>
                            <div className={styles.inputContainer}>
                                <div className={styles.input}>{sectionData.strand}</div>
                            </div>
                        </div>
                    )}
                    {sectionData.semester && (
                        <div className={styles.formFields}>
                            <div className={styles.labelContainer}>
                                <label htmlFor="semester" className={styles.label}>
                                    Semester
                                </label>
                            </div>

                            <div className={styles.inputContainer}>
                                <div className={styles.input}>{sectionData.semester}</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.container}>
                <h1 className={styles.header}>{subject + ' Grade'}</h1>
                <div className={styles.filterContainer}>
                    <input className={styles.input} type="search" name="searchbar" id="searchbar" placeholder="Search Lastname" onChange={searchBarHandler} />
                </div>

                <div className={styles.columnName}>Sections</div>
                {sectionData.yearLevel !== '12' && sectionData.yearLevel !== '11' ? (
                    <ul className={styles.listContainer}>
                        <div className={styles.columnTitlecontainer}>
                            <h4 className={styles.name}>Student Name</h4>
                            <h4 className={styles.name}>Q1</h4>
                            <h4 className={styles.name}>Q2</h4>
                            <h4 className={styles.name}>Q3</h4>
                            <h4 className={styles.name}>Q4</h4>
                            <h4 className={styles.name}>Final</h4>
                            <h4 className={styles.name}>Mark</h4>
                        </div>

                        {filter(studentData).map((item, i) => (
                            <li className={styles.itemContainer} key={i}>
                                <div className={styles.userName}>{item.name}</div>
                                <div className={styles.quarterGrade}>
                                    <input
                                        type="number"
                                        name="q1Grade"
                                        onChange={(e) => {
                                            handleInputChange(e, i);
                                            computeGradeHandler(e, i);
                                        }}
                                        value={studentData[i].q1Grade}
                                        // placeholder={item.q1Grade}
                                    />
                                </div>
                                <div className={styles.quarterGrade}>
                                    <input
                                        type="number"
                                        name="q2Grade"
                                        onChange={(e) => {
                                            handleInputChange(e, i);
                                            computeGradeHandler(e, i);
                                        }}
                                        value={studentData[i].q2Grade}
                                        // placeholder={item.q2Grade}
                                    />
                                </div>
                                <div className={styles.quarterGrade}>
                                    <input
                                        type="number"
                                        name="q3Grade"
                                        onChange={(e) => {
                                            handleInputChange(e, i);
                                            computeGradeHandler(e, i);
                                        }}
                                        // placeholder={item.q3Grade}
                                        value={studentData[i].q3Grade}
                                    />
                                </div>
                                <div className={styles.quarterGrade}>
                                    <input
                                        type="number"
                                        name="q4Grade"
                                        onChange={(e) => {
                                            handleInputChange(e, i);
                                            computeGradeHandler(e, i);
                                        }}
                                        value={studentData[i].q4Grade}
                                        // placeholder={item.q4Grade}
                                    />
                                </div>
                                <div className={styles.quarterGrade}>
                                    <input
                                        type="number"
                                        name="computedGrade"
                                        onChange={(e) => handleInputChange(e, i)}
                                        value={studentData[i].computedGrade}
                                        // placeholder={item.q4Grade}
                                    />
                                </div>
                                <div className={styles.quarterGrade}>
                                    <input
                                        type="text"
                                        name="remarks"
                                        onChange={(e) => handleInputChange(e, i)}
                                        value={studentData[i].remarks}
                                        // placeholder={item.q4Grade}
                                    />
                                </div>
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

                        {filter(studentData).map((item, i) => (
                            <li className={styles.itemContainer2} key={i}>
                                <div className={styles.userName2}>{item.name}</div>
                                <div className={styles.quarterGrade2}>
                                    <input
                                        type="number"
                                        name="q1Grade"
                                        onChange={(e) => {
                                            handleInputChange(e, i);
                                            computeGradeHandler2(e, i);
                                        }}
                                        value={studentData[i].q1Grade}
                                    />
                                </div>
                                <div className={styles.quarterGrade2}>
                                    <input
                                        type="number"
                                        name="q2Grade"
                                        onChange={(e) => {
                                            handleInputChange(e, i);
                                            computeGradeHandler2(e, i);
                                        }}
                                        value={studentData[i].q2Grade}
                                    />
                                </div>
                                <div className={styles.quarterGrade2}>
                                    <input
                                        type="number"
                                        name="computedGrade"
                                        onChange={(e) => handleInputChange(e, i)}
                                        value={studentData[i].computedGrade}
                                        // placeholder={item.q4Grade}
                                    />
                                </div>
                                <div className={styles.quarterGrade2}>
                                    <input
                                        type="text"
                                        name="remarks"
                                        onChange={(e) => handleInputChange(e, i)}
                                        value={studentData[i].remarks}
                                        // placeholder={item.q4Grade}
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

                <Button type="submit" className={styles.submitButton}>
                    Submit
                </Button>
            </div>
            {valid && (
                <Modal className={styles.modalDesign}>
                    <div className={styles.messageContainer}>
                        <h2 className={styles.messageHeader}>Grades Encoded</h2>
                        <h4 className={styles.messageFooter}>Thank you.</h4>
                        <Button
                            className={styles.modalButton}
                            onClick={() => {
                                router.push('/teacher/Sections');
                            }}
                        >
                            Go back to List
                        </Button>
                    </div>
                </Modal>
            )}
        </form>
    );
}

export default EncodeGrades;
