import styles from "./page.module.sass";

interface LanguageProps {
    item: {
        id: number;
        name: string;
        institute: string;
        moreInfo: string[];
    }
}

function Language({item}: LanguageProps) {
    return (
        <div className={styles.educationItem}>
            <h4 className={styles.title}>{item.name}</h4>
            {item.institute && (<span className={styles.info}>{item.institute}</span>)}
            {item.moreInfo.map((info, index) => (
                <span key={`Info-${index + 1}`} className={styles.moreInfo}>{info}</span>
            ))}
        </div>
    );
}

export default Language;
