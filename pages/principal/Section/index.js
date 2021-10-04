import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SectionPageContainer from '../../../components/PrincipalPageComponent/SectionPageContainer';
function SectionPage() {
    const [section, setSection] = useState([]);
    const getSections = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/principal/sections`, { withCredentials: true });
            setSection(response.data.sections);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getSections();
    }, []);
    return (
        <div>
            <SectionPageContainer data={section} />
        </div>
    );
}

export default SectionPage;
