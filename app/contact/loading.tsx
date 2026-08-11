import Container from "@/components/container/page";
import {ContactPageSkeleton} from "@/components/skeleton/page";

export default function ContactLoading() {
    return (
        <main>
            <section className="pt-[100px]">
                <Container className="bg-(--secondaryColor)">
                    <ContactPageSkeleton />
                </Container>
            </section>
        </main>
    );
}
