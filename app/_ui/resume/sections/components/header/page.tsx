import styles from "./page.module.sass";
import {CiLocationOn, CiMobile2} from "react-icons/ci";
import {MdLanguage, MdOutlineEmail} from "react-icons/md";
import {FaLinkedin} from "react-icons/fa";
import cls from "@/utils/class_names";
import * as React from "react";

function Header() {
  return (
      <header className={styles.header}>
          <div className={styles.nameWrapper}>
              <span className={styles.firstname}>Mahrokh</span>
              <b className={styles.lastname}>Nabizadeh</b>
              <span className={styles.profession}>Frontend Developer</span>
          </div>

          <ul className={styles.contactWrapper}>
             <li>
                 <CiMobile2 className={styles.icon} />
                <span className={styles.text}>-</span>
             </li>
              <li>
                  <MdOutlineEmail className={styles.icon}/>
                  <a className={cls(styles.text, styles.link)} href="mailto:mahrokh.nz@gmail.com">Mahrokh.nz@gmail.com</a>
              </li>
              <li>
                  <MdLanguage className={styles.icon} />
                  <a className={cls(styles.text, styles.link)} target='_blank' href="https://www.mahrokhnz.ir/">www.mahrokhnz.ir</a>
              </li>
              <li>
                  <FaLinkedin className={styles.icon} />
                  <a className={cls(styles.text, styles.link)} target='_blank' href="https://www.linkedin.com/in/mahrokh-nabizadeh-335326144/">Linkedin</a>
              </li>
              <li>
                  <CiLocationOn className={styles.icon} />
                  <span className={styles.text}>Tehran, Iran</span>
              </li>
          </ul>
      </header>
  );
}

export default Header;
