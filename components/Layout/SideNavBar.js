import React from 'react';
import styles from './sideNavBar.module.css';

import SideNavBarItems from './SideNavBarItems';
function SideNavBar(props) {

    

      return (
            <div className={props.className}>
                  <ul className={`${styles.navContainer} ${styles[props.highlighted]}`}>
                        {props.items.map((item) => (
                              <SideNavBarItems
                                    key={item.id}
                                    title={item.title}
                                    link={item.push}
                                    
                              />
                        ))}
                  </ul>
            </div>
      );
}

export default React.memo(SideNavBar);
