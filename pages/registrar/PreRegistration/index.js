import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import PreRegistrationListContainer from '../../../components/RegistrarPageComponent/PreRegistrationListContainer';
function PreRegistration() {
    const [allPreRegs, setAllPreRegs] = useState([]);
    const getAllPreRegs = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/registrar/preregs`, { withCredentials: true });
            setAllPreRegs(response.data.preregs);
            console.log(response.data.preregs);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getAllPreRegs();
    }, []);

    return (
        <div>
            <PreRegistrationListContainer data={allPreRegs} />
        </div>
    );
}

export default PreRegistration;
