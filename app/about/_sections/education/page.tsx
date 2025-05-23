import styles from "./page.module.sass";
import Container from "@/components/container/page";
import SectionTitle from "@/components/section_title/page";
import data from "@/data/db.json";
import EducationItem from "@/app/about/_sections/education/components/education_item/page";

function Education() {
    const {educations} = data

    return (
        <section className={styles.education}>
            <Container className={styles.educationContainer}>
                <SectionTitle text='My Education' />
                <div className={styles.educationWrapper}>
                    {educations.map((education) => (
                        <EducationItem key={education.id} data={education} />
                    ))}
                </div>
            </Container>
        </section>
    );
}

export default Education
