import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import StudentProfilePageContainer from '../../../components/RegistrarPageComponent/StudentProfilePageContainer';
function SelectedUser(props) {
    const router = useRouter();
    const id = router.query.id;
    console.log(id);

    const [userData, setUserData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/registrar/students/${id}`, {
                    withCredentials: true,
                });
                const data = await response.data.user;
                console.log(data);
                setUserData(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [id]);

    return (
        <div>
            <StudentProfilePageContainer data={userData} />
        </div>
    );
}

export default SelectedUser;
