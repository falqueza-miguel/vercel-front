import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TeacherPageContainer from '../../../components/PrincipalPageComponent/TeacherPageContainer';
function TeacherPage(props) {
    const [teachers, setTeachers] = useState([]);
    const getTeachers = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/principal/teachers`, { withCredentials: true });
            setTeachers(response.data.users);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getTeachers();
    }, []);
    return (
        <div>
            <TeacherPageContainer data={teachers} />
        </div>
    );
}

export default TeacherPage;
