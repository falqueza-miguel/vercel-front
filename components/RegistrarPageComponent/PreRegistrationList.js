import React, { useState } from 'react';
import styles from './preRegistrationList.module.css';

import PreRegistrationListItem from './PreRegistrationListItem';

function PreRegistrationList(props) {
      const [search, setSearch] = useState('');
      const [yearLevel, setYearLevel] = useState('all');

      const searchBarHandler = (event) => {
            setSearch(event.target.value);
      };

      const filter = (list) => {
            if (yearLevel === 'all') {
                  return list.filter(
                        (data) =>
                              data.studentLastName
                                    .toLowerCase()
                                    .indexOf(search) > -1
                  );
            } else {
                  return list.filter(
                        (data) =>
                              data.levelEnroll == yearLevel &&
                              data.studentLastName
                                    .toLowerCase()
                                    .indexOf(search) > -1
                  );
            }
      };
      console.log(search);
      const yearLevelHandler = (event) => {
            setYearLevel(event.target.value);
      };
      return (
            <div className={styles.container}>
                  <h1 className={styles.header}>Pre-registrations</h1>
                  <div className={styles.filterContainer}>
                        <div className={styles.select}>
                              <p className={styles.dropdownName}> Grade:</p>
                              <select
                                    name="yearlevel"
                                    id="yearlevel"
                                    onChange={yearLevelHandler}
                              >
                                    <option value="all">All</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                              </select>
                        </div>

                        <input
                              className={styles.input}
                              type="search"
                              name="searchbar"
                              id="searchbar"
                              placeholder="Search lastname"
                              onChange={searchBarHandler}
                              value={props.searchBind}
                        />
                  </div>
                  <div className={styles.columnName}>Pre-registrations</div>
                  <ul className={styles.listContainer}>
                        <h4 className={styles.name}>Name</h4>
                        {filter(props.data).map((item) => (
                              <PreRegistrationListItem
                                    key={item._id}
                                    data={item}
                              />
                        ))}
                  </ul>
            </div>
      );
}

export default PreRegistrationList;
