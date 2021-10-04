import React, { useState } from "react";
import SideNavBar from "../Layout/SideNavBar";
import styles from "./preRegistrationListContainer.module.css";
import PreRegistrationList from "./PreRegistrationList";

function PreRegistrationListContainer(props) {
   const focus = "second";
   const navBarItems = [
      { id: 1, title: "Profile", push: "/registrar" },
      { id: 2, title: "Pre-Registration", push: "/registrar/PreRegistration" },
      { id: 3, title: "Students", push: `/registrar/Students` },
   ];
   return (
      <div className={styles.preRegistrationContainer}>
         <SideNavBar
            className={styles.navbarContainer}
            items={navBarItems}
            highlighted={focus}
         />
         <PreRegistrationList
            className={styles.displayFieldContainer}
            data={props.data}
         />
      </div>
   );
}

export default PreRegistrationListContainer;
