import Container from "@/components/container/page";
import {ContactPageSkeleton} from "@/components/skeleton/page";

export default function ContactLoading() {
    return (
        <Container>
            <ContactPageSkeleton />
        </Container>
    );
}
