import React from 'react';
import styles from './listOfBalanceItem.module.css';
import { useRouter } from 'next/router';

function ListOfBalanceItem(props) {
    const router = useRouter();

    return (
        <li className={styles.itemContainer}>
            <div className={styles.userName}>
                Grade {props.data.yearLevel} - ( {props.data.schoolYearFrom} - {props.data.schoolYearTo}&nbsp; {props.data.semester && props.data.semester} &nbsp;Semester ) -{' '}
                {props.data.modeOfPayment} - {props.data.paymentTerms}
            </div>
            <div className={styles.userName}>
                <button
                    className={styles.button}
                    onClick={() => {
                        router.push(`/accountant/SpecificBalance/${props.studId}/${props.data._id}`);
                    }}
                >
                    Edit
                </button>
            </div>
        </li>
    );
}

export default ListOfBalanceItem;
