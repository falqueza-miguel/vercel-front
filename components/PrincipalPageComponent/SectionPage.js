import React, { useState } from 'react';
import styles from './sectionPage.module.css';
import SectionItem from './SectionItem';
import Button from '../UI/Button';
import { useRouter } from 'next/router';

function SectionPage(props) {
      const router = useRouter();
      const [search, setSearch] = useState('');
      const [yearLevel, setYearLevel] = useState('all');
      const searchBarHandler = (event) => {
            setSearch(event.target.value);
      };
      const filter = (list) => {
            if (yearLevel === 'all') {
                  return list.filter(
                        (data) =>
                              data.sectionName.toLowerCase().indexOf(search) >
                              -1
                  );
            } else {
                  return list.filter(
                        (data) =>
                              data.yearLevel === yearLevel &&
                              data.sectionName.toLowerCase().indexOf(search) >
                                    -1
                  );
            }
      };
      const yearLevelHandler = (event) => {
            setYearLevel(event.target.value);
      };
      return (
            <div className={styles.container}>
                  <h1 className={styles.header}>Sections</h1>
                  <div className={styles.createButtonContainer}>
                        <Button
                              className={styles.createButton}
                              onClick={() => {
                                    router.push(
                                          '/principal/Section/CreateSection'
                                    );
                              }}
                        >
                              &#65291; Create Section
                        </Button>
                  </div>
                  <div className={styles.filterContainer}>
                        <div className={styles.select}>
                              <p className={styles.dropdownName}>Year Level:</p>
                              <select
                                    name="yearLevel"
                                    id="yearLevel"
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
                              placeholder="Search section name"
                              onChange={searchBarHandler}
                              value={props.searchBind}
                        />
                  </div>

                  <div className={styles.columnName}>Sections</div>
                  <ul className={styles.listContainer}>
                        <h4 className={styles.name}>Name</h4>
                        {filter(props.data).map((item) => (
                              <SectionItem key={item._id} data={item} />
                        ))}
                  </ul>
            </div>
      );
}

export default SectionPage;
