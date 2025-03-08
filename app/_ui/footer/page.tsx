import styles from "./page.module.sass";
import Menu from "@/app/_ui/menu/page";
import Contact from "@/app/_ui/contact/page";

function Footer() {
    const date: Date = new Date();
    const year: number = date.getFullYear();

    return (
        <footer className={styles.footerWrapper}>
            <div className={styles.footer}>
                <Menu isFooter={true} />
                <Contact isFooter={true} />
            </div>
            <div className={styles.separator}></div>
            <span className={styles.copyWrite}>
                © {year} MAHrokh Tehran, Iran. All rights reserved.
            </span>
        </footer>
    );
}

export default Footer
