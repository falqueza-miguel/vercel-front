import React from 'react';
import SpecificBalanceContainer from '../../../../components/AccountantPageComponent/SpecificBalanceContainer';
import { useRouter } from 'next/router';
function SpecificBalance() {
      const router = useRouter();
      const studID = router.query.studID;
      const balanceID = router.query.balanceID;

      return (
            <div>
                  <SpecificBalanceContainer studID={studID} balanceID={balanceID} />
            </div>
      );
}

export default SpecificBalance;
