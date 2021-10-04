import React from 'react';
import CreateBalanceContainer from '../../../components/AccountantPageComponent/CreateBalanceContainer';

import { useRouter } from 'next/router';
function CreateBalance() {
      const router = useRouter();
      const id = router.query.id;
      return (
            <div>
                  <CreateBalanceContainer id={id} />
            </div>
      );
}

export default CreateBalance;
