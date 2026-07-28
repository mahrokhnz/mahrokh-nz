import Container from "@/components/container/page";
import SectionTitle from "@/components/section_title/page";
import data from "@/data/db.json";
import EducationItem from "@/app/about/_sections/education/components/education_item/page";

function Education() {
    const {educations} = data

    return (
        <section>
            <Container className="bg-(--secondaryColor)">
                <SectionTitle text='My Education' />
                <div className="flex justify-between gap-5 max-medium-desktop:flex-col">
                    {educations.map((education) => (
                        <EducationItem key={education.id} data={education} />
                    ))}
                </div>
            </Container>
        </section>
    );
}

export default Education
