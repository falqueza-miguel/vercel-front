import React, { useState, useEffect } from 'react';
import ListOfBalanceContainer from '../../../components/AccountantPageComponent/ListOfBalanceContainer';
import axios from 'axios';
import { useRouter } from 'next/router';

function ListOfBalance() {
    const [user, setUser] = useState([]);
    const [balances, setBalances] = useState([]);
    const router = useRouter();
    const id = router.query.id;
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/accountant/students/${id}`, {
                    withCredentials: true,
                });
                setUser(response.data.user);
                setBalances(response.data.balances);
                console.log(response.data.user);
                console.log(response.data.balances);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [id]);
    return (
        <div>
            <ListOfBalanceContainer user={user} balances={balances} />
        </div>
    );
}

export default ListOfBalance;
