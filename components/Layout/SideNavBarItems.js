import React from 'react';
import styles from './sideNavBarItems.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

function SideNavBarItems(props) {
      const router = useRouter();
      return (
            <li className={styles.linkstyle}>
                  <Link href={props.link}>
                        <a>{props.title}</a>
                  </Link>
            </li>
      );
}

export default SideNavBarItems;
