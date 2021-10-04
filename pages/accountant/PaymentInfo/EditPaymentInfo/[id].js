import React from 'react';
import { useRouter } from 'next/router';
import EditPaymentInfoContainer from '../../../../components/AccountantPageComponent/EditPaymentInfoContainer';

function EditPaymentInfo() {
    const router = useRouter();
    const id = router.query.id;
    return (
        <div>
            <EditPaymentInfoContainer id={id} />
        </div>
    );
}

export default EditPaymentInfo;
