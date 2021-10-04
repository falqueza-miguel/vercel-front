import React, { useState, useEffect } from 'react';
import styles from './listOfBalance.module.css';
import ListOfBalanceItem from './ListOfBalanceItem';

import { useRouter } from 'next/router';
import Button from '../UI/Button';

function ListOfBalance(props) {
      const router = useRouter();
      const [yearLevel, setYearLevel] = useState('all');
      const filter = (list) => {
            if (yearLevel === 'all') {
                  return list.filter((data) => data.yearLevel > 6 && data.yearLevel < 13);
            } else {
                  return list.filter((data) => data.yearLevel === yearLevel);
            }
      };
      const yearLevelHandler = (event) => {
            setYearLevel(event.target.value);
      };
      return (
            <div className={styles.container}>
                  <h1 className={styles.header}>List of Balances</h1>

                  <div className={styles.createButtonContainer}>
                        <Button
                              className={styles.createButton}
                              onClick={() => {
                                    router.push(`/accountant/CreateBalance/${props.user._id}`);
                              }}
                        >
                              &#65291; Create Balance
                        </Button>
                  </div>
                  <div className={styles.filterContainer}>
                        <div className={styles.select}>
                              <p className={styles.dropdownName}>Year Level:</p>
                              <select name="yearLevel" id="yearLevel" onChange={yearLevelHandler}>
                                    <option value="all">All</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                              </select>
                        </div>
                  </div>
                  <div className={styles.columnName}>
                        {props.user.lastName} , {props.user.firstName}
                        {props.user.middleName}
                  </div>
                  <ul className={styles.listContainer}>
                        <div className={styles.columnTitlecontainer}></div>

                        {props.balances &&
                              filter(props.balances).map((item, i) => (
                                    <ListOfBalanceItem key={i} data={item} studId={props.user._id} />
                              ))}
                  </ul>
            </div>
      );
}

export default ListOfBalance;
