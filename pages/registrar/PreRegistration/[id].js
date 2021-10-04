import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import PreRegistrationForm from '../../../components/RegistrarPageComponent/PreRegistrationForm';

function SelectedPreReg(props) {
    const router = useRouter();
    const id = router.query.id;
    console.log(id);
    const [preRegData, setPreRegData] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/registrar/preregs/${id}`, {
                    withCredentials: true,
                });
                const data = await response.data.prereg;
                console.log(data);
                setPreRegData(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [id]);
    return (
        <div>
            <PreRegistrationForm data={preRegData} />
        </div>
    );
}

export default SelectedPreReg;
