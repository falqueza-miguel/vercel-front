import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import EditTeacherContainer from '../../../components/PrincipalPageComponent/EditTeacherContainer';

function EditTeacher() {
    const router = useRouter();
    const id = router.query.id;
    const [teacherData, setTeacherData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/principal/teachers/${id}`, {
                    withCredentials: true,
                });
                const data = await response.data.user;
                console.log(data);
                setTeacherData(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [id]);
    return (
        <div>
            <EditTeacherContainer data={teacherData} />
        </div>
    );
}

export default EditTeacher;
