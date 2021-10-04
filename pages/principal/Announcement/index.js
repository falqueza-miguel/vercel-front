import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnnouncementPageContainer from '../../../components/PrincipalPageComponent/AnnouncementPageContainer';

function AnnouncementPage(props) {
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/principal/annc`, { withCredentials: true });
                setAnnouncements(response.data.anncs);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);
    return (
        <div>
            <AnnouncementPageContainer anncs={announcements} />
        </div>
    );
}

export default AnnouncementPage;
