import styles from "./page.module.sass";
import { FaGithubSquare } from "react-icons/fa";
import { FaHackerrank } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import cls from "@/utils/class_names";

export default function Contact({isFooter = false}) {
    return (
        <div className={cls(styles.contactWrapper, isFooter && styles.footerContactWrapper)}>
            <a className={styles.iconWrapper} href="https://github.com/mahrokhnz" target="_blank">
                <FaGithubSquare className={styles.contactIcon} />
            </a>
            <a className={styles.iconWrapper} href="https://www.hackerrank.com/mahrokhnz" target="_blank">
                <FaHackerrank className={styles.contactIcon} />
            </a>
            <a className={styles.iconWrapper} href="https://www.linkedin.com/in/mahrokh-nabizadeh-335326144/" target="_blank">
                <FaLinkedin className={styles.contactIcon} />
            </a>
        </div>
    );
}
