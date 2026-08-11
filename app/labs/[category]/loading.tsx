import LabsShell from "@/app/labs/_components/labs_shell/page";
import {LabsCategorySkeleton} from "@/components/skeleton/page";

export default function LabsCategoryLoading() {
    return (
        <LabsShell>
            <LabsCategorySkeleton />
        </LabsShell>
    );
}
