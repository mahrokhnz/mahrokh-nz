import LabsShell from "@/app/labs/_components/labs_shell/page";
import {LabsPageSkeleton} from "@/components/skeleton/page";

export default function LabsLoading() {
    return (
        <LabsShell>
            <LabsPageSkeleton />
        </LabsShell>
    );
}
