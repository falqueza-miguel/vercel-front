import React, { useState } from 'react';
import styles from './createSection.module.css';
import useInput from '../hooks/useInput';
import { useRouter } from 'next/router';
import axios from 'axios';
import Modal from '../../components/Layout/Modal.';
import Button from '../UI/Button';

function CreateSection() {
    const router = useRouter();
    const [valid, setValid] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const {
        value: enteredSchoolYearFrom,
        isValid: enteredSchoolYearFromIsValid,
        hasError: enteredSchoolYearFromHasError,
        valueChangeHandler: schoolYearFromChangeHandler,
        inputBlurHandler: schoolYearFromBlurHandler,
    } = useInput((value) => !isNaN(value));
    const {
        value: enteredSchoolYearTo,
        isValid: enteredSchoolYearToIsValid,
        hasError: enteredSchoolYearToHasError,
        valueChangeHandler: schoolYearToChangeHandler,
        inputBlurHandler: schoolYearToBlurHandler,
    } = useInput((value) => !isNaN(value));

    const {
        value: enteredSectionName,
        isValid: enteredSectionNameIsValid,
        hasError: enteredSectionNameHasError,
        valueChangeHandler: sectionNameChangeHandler,
        inputBlurHandler: sectionNameBlurHandler,
    } = useInput((value) => value.trim() !== '');

    const {
        value: enteredStrand,
        isValid: enteredStrandIsValid,
        hasError: enteredStrandHasError,
        valueChangeHandler: strandChangeHandler,
        inputBlurHandler: strandBlurHandler,
    } = useInput((value) => value.trim() !== '');

    const {
        value: enteredYearLevel,
        isValid: enteredYearLevelIsValid,
        hasError: enteredYearLevelHasError,
        valueChangeHandler: yearLevelChangeHandler,
        inputBlurHandler: yearLevelBlurHandler,
    } = useInput((value) => !isNaN(value));
    const {
        value: enteredSemester,
        isValid: enteredSemesterIsValid,
        hasError: enteredSemesterHasError,
        valueChangeHandler: semesterChangeHandler,
        inputBlurHandler: semesterBlurHandler,
    } = useInput((value) => value.trim() !== '');
    // add subject
    const [addSubject, setAddSubject] = useState([{ subject: '', teacher: '', schedule: '', error: false }]);

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...addSubject];
        list[index][name] = value;
        setAddSubject(list);
    };
    const handleAddClick = () => {
        setAddSubject([...addSubject, { subject: '', teacher: '', schedule: '', error: false }]);
    };
    const handleRemoveClick = (index) => {
        const list = [...addSubject];
        list.splice(index, 1);
        setAddSubject(list);
    };

    const {
        value: enteredSubject,
        isValid: enteredSubjectIsValid,
        hasError: enteredSubjectHasError,
        valueChangeHandler: subjectChangeHandler,
        inputBlurHandler: subjectBlurHandler,
    } = useInput((value) => value.trim() !== '');
    const {
        value: enteredTeacher,
        isValid: enteredTeacherIsValid,
        hasError: enteredTeacherHasError,
        valueChangeHandler: teacherChangeHandler,
        inputBlurHandler: teacherBlurHandler,
    } = useInput((value) => value.trim() !== '');
    const {
        value: enteredSchedule,
        isValid: enteredScheduleIsValid,
        hasError: enteredScheduleHasError,
        valueChangeHandler: scheduleChangeHandler,
        inputBlurHandler: scheduleBlurHandler,
    } = useInput((value) => value.trim() !== '');
    let formIsValid = false;
    if (enteredSchoolYearFromIsValid && enteredSchoolYearToIsValid && enteredSectionNameIsValid && enteredStrandIsValid) {
        formIsValid = true;
    }
    const [grade, setGrade] = useState(7);
    const gradeHandler = (e) => {
        setGrade(e.target.value);
        if (e.target.value === '7' || e.target.value === '8' || e.target.value === '9' || e.target.value === '10') {
            setDisabled(true);
        } else if (e.target.value === '11' || e.target.value === '12') {
            setDisabled(false);
        }
    };
    const [firstSemester, setfirstSemester] = useState(false);
    const [secondSemester, setsecondSemester] = useState(false);

    console.log(grade);
    let subjectArray = [];
    let teacherArray = [];
    let scheduleArray = [];

    const onSubmitHandler = (event) => {
        event.preventDefault();
        for (let i = 0; i < addSubject.length; i++) {
            subjectArray[i] = addSubject[i]['subject'];
            teacherArray[i] = addSubject[i]['teacher'].toLowerCase().toString();
            scheduleArray[i] = addSubject[i]['schedule'];
        }
        let semester = '';
        if (firstSemester) {
            semester = '1st';
        } else {
            semester = '2nd';
        }

        const sectionData = {
            schoolYearFrom: enteredSchoolYearFrom,
            schoolYearTo: enteredSchoolYearTo,
            yearLevel: grade,
            strand: enteredStrand,
            semester: semester,
            sectionName: enteredSectionName,
            subjects: subjectArray,
            teachers: teacherArray,
            schedule: scheduleArray,
        };

        const postData = async () => {
            console.log(addSubject);
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/principal/createsection`, sectionData, { withCredentials: true });
                console.log(response.data);
                if (response.data.success) {
                    setValid(true);
                }
                for (let i = 0; i < teacherArray.length; i++) {
                    if (response.data === `${teacherArray[i]} doesnt exist`) {
                        addSubject[i]['error'] = true;
                        setErrorMes({ bool: true, index: i });
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };
        console.log(sectionData);
        postData();
    };

    return (
        <form className={styles.container} onSubmit={onSubmitHandler}>
            <h1 className={styles.header}>Create New Section</h1>
            <div className={styles.formWrapper}>
                <div className={styles.formContainer}>
                    <div
                        className={
                            !enteredSchoolYearFromHasError
                                ? styles.formFields
                                : `${styles.formFields} 
                  ${styles.invalid}`
                        }
                    >
                        <div className={styles.labelContainer}>
                            <label htmlFor="schoolYearFrom" className={styles.label}>
                                School Year From
                            </label>
                        </div>
                        <div className={styles.inputContainer}>
                            <input
                                type="number"
                                required={true}
                                id="schoolYearFrom"
                                className={styles.input}
                                value={enteredSchoolYearFrom}
                                onChange={schoolYearFromChangeHandler}
                                onBlur={schoolYearFromBlurHandler}
                            />
                        </div>
                    </div>
                    <div
                        className={
                            !enteredSchoolYearToHasError
                                ? styles.formFields
                                : `${styles.formFields} 
                  ${styles.invalid}`
                        }
                    >
                        <div className={styles.labelContainer}>
                            <label htmlFor="schoolYearTo" className={styles.label}>
                                School Year To
                            </label>
                        </div>
                        <div className={styles.inputContainer}>
                            <input
                                type="number"
                                required={true}
                                id="schoolYearTo"
                                className={styles.input}
                                value={enteredSchoolYearTo}
                                onChange={schoolYearToChangeHandler}
                                onBlur={schoolYearToBlurHandler}
                            />
                        </div>
                    </div>
                    <div
                        className={
                            !enteredSectionNameHasError
                                ? styles.formFields
                                : `${styles.formFields} 
                  ${styles.invalid}`
                        }
                    >
                        <div className={styles.labelContainer}>
                            <label htmlFor="sectionName" className={styles.label}>
                                Section Name
                            </label>
                        </div>
                        <div className={styles.inputContainer}>
                            <input
                                type="text"
                                required={true}
                                id="sectionName"
                                className={styles.input}
                                value={enteredSectionName}
                                onChange={sectionNameChangeHandler}
                                onBlur={sectionNameBlurHandler}
                            />
                        </div>
                    </div>
                    <div
                        className={
                            !enteredStrandHasError
                                ? styles.formFields
                                : `${styles.formFields} 
                  ${styles.invalid}`
                        }
                    >
                        <div className={styles.labelContainer}>
                            <label htmlFor="strand" className={styles.label}>
                                Strand
                            </label>
                        </div>
                        <div className={styles.inputContainer}>
                            <input
                                type="text"
                                required={true}
                                id="strand"
                                className={styles.input}
                                value={enteredStrand}
                                onChange={strandChangeHandler}
                                onBlur={strandBlurHandler}
                                disabled={disabled}
                            />
                        </div>
                    </div>
                    <div
                        className={
                            !enteredYearLevelHasError
                                ? styles.formFields
                                : `${styles.formFields} 
                  ${styles.invalid}`
                        }
                    >
                        <div className={styles.labelContainer}>
                            <label htmlFor="yearLevel" className={styles.label}>
                                Grade Level
                            </label>
                        </div>

                        <div className={styles.dropdown}>
                            <select name="gradeLevel" id="gradeLevel" onChange={gradeHandler} value={grade}>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </select>
                        </div>
                    </div>
                    <div
                        className={
                            !enteredSemesterHasError
                                ? styles.formFields
                                : `${styles.formFields} 
                  ${styles.invalid}`
                        }
                    >
                        <div className={styles.labelContainer}>
                            <label htmlFor="semester" className={styles.label}>
                                Semester
                            </label>
                        </div>

                        <div className={styles.radioInput}>
                            <div>
                                <input
                                    type="radio"
                                    name="semester"
                                    id="1stsemester"
                                    // required={true}
                                    checked={firstSemester}
                                    onChange={() => {
                                        setfirstSemester(!firstSemester);
                                    }}
                                    disabled={disabled}
                                />
                                <label htmlFor="1stsemester">1st</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    name="semester"
                                    id="2ndsemester"
                                    // required={true}
                                    checked={secondSemester}
                                    onChange={() => {
                                        setsecondSemester(!secondSemester);
                                    }}
                                    disabled={disabled}
                                />
                                <label htmlFor="2ndsemester">2nd</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.addTeacherButtonContainer}>
                <Button className={styles.addTeacherButton} onClick={handleAddClick}>
                    Add Teacher
                </Button>
            </div>
            {addSubject.map((x, i) => {
                return (
                    <div key={i}>
                        <div className={styles.addSubjectWrapper}>
                            <div className={styles.removeTeacherButtonContainer}>
                                <a className={styles.removeTeacherButton} onClick={handleRemoveClick}>
                                    &#x2715;
                                </a>
                            </div>
                            <div className={styles.addSubjectContainer}>
                                <div
                                    className={
                                        !enteredSubjectHasError
                                            ? styles.formFields
                                            : `${styles.formFields} 
      ${styles.invalid}`
                                    }
                                >
                                    <div className={styles.labelContainer}>
                                        <label htmlFor="subject" className={styles.label}>
                                            Subject
                                        </label>
                                    </div>
                                    <div className={styles.inputContainer}>
                                        <input
                                            type="text"
                                            required={true}
                                            id="subject"
                                            className={styles.input}
                                            value={x.subject}
                                            placeholder="Subject"
                                            name="subject"
                                            onChange={(e) => handleInputChange(e, i)}
                                            // onBlur={
                                            //       subjectBlurHandler
                                            // }
                                        />
                                    </div>
                                </div>
                                <div
                                    className={
                                        !enteredTeacherHasError
                                            ? styles.formFields
                                            : `${styles.formFields} 
      ${styles.invalid}`
                                    }
                                >
                                    <div className={styles.labelContainer}>
                                        <label htmlFor="teacher" className={styles.label}>
                                            Teacher
                                        </label>
                                    </div>
                                    <div className={styles.inputContainer}>
                                        <input
                                            type="email"
                                            required={true}
                                            id="teacher"
                                            name="teacher"
                                            placeholder="Teacher Email"
                                            className={styles.input}
                                            value={x.teacher}
                                            onChange={(e) => handleInputChange(e, i)}
                                            // onBlur={
                                            //       teacherBlurHandler
                                            // }
                                        />
                                        {addSubject[i]['error'] && <p className={styles.errorMes}>Email does not exist</p>}
                                        {/* {errorMes.bool && <p>INVALID</p>} */}
                                    </div>
                                </div>
                                <div
                                    className={
                                        !enteredScheduleHasError
                                            ? styles.formFields
                                            : `${styles.formFields} 
      ${styles.invalid}`
                                    }
                                >
                                    <div className={styles.labelContainer}>
                                        <label htmlFor="schedule" className={styles.label}>
                                            Schedule
                                        </label>
                                    </div>
                                    <div className={styles.inputContainer}>
                                        <input
                                            type="text"
                                            required={true}
                                            id="schedule"
                                            name="schedule"
                                            placeholder="Schedule"
                                            className={styles.input}
                                            value={x.schedule}
                                            onChange={(e) => handleInputChange(e, i)}
                                            // onBlur={
                                            //       scheduleBlurHandler
                                            // }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {valid && (
                            <Modal className={styles.modalDesign}>
                                <div className={styles.messageContainer}>
                                    <h2 className={styles.messageHeader}>Section Created</h2>
                                    <h4 className={styles.messageBody}>Please check in the List of Section Tab</h4>
                                    <h4 className={styles.messageFooter}>Thank you.</h4>
                                    <Button
                                        className={styles.modalButton}
                                        onClick={() => {
                                            router.push('/principal/Section');
                                        }}
                                    >
                                        Go back to Teacher List
                                    </Button>
                                </div>
                            </Modal>
                        )}
                    </div>
                );
            })}

            <Button className={styles.button} type={'submit'}>
                Create
            </Button>
        </form>
    );
}

export default CreateSection;
