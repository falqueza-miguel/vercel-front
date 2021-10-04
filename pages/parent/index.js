import React, { useState, useEffect } from 'react';
import ProfilePageContainer from '../../components/ParentPageComponent/ProfilePageContainer';
import axios from 'axios';
function ParentPage() {
    const [profile, setProfile] = useState([]);
    const getProfile = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/parent`, {
                withCredentials: true,
            });
            setProfile(response.data.user);
            console.log(response.data.user);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getProfile();
    }, []);
    return (
        <div>
            <ProfilePageContainer data={profile} />
        </div>
    );
}

export default ParentPage;
