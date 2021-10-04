import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfilePageContainer from '../../components/PrincipalPageComponent/ProfilePageContainer';

function PrincipalPage(props) {
    const [profile, setProfile] = useState([]);
    const getProfile = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/principal`, {
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
            <div>
                <ProfilePageContainer data={profile} />
            </div>
        </div>
    );
}

export default PrincipalPage;
