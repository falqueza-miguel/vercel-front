import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import AdminEditUserContainer from '../../../components/AdminPageComponent/AdminEditUserContainer.';
function EditUser(props) {
    const router = useRouter();
    const id = router.query.editUser;
    console.log(id);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/admin/users/${id}`, {
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
            <AdminEditUserContainer data={userData} />
        </div>
    );
}

export default EditUser;
