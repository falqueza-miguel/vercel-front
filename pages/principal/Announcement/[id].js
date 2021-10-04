import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import EditAnnouncementContainer from '../../../components/PrincipalPageComponent/EditAnnouncementContainer';
function EditAnnouncement(props) {
    const router = useRouter();
    const id = router.query.id;

    return (
        <div>
            <EditAnnouncementContainer id={id} />
        </div>
    );
}

export default EditAnnouncement;
