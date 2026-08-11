import LabsShell from "@/app/labs/_components/labs_shell/page";
import {SkeletonPulse} from "@/components/skeleton/page";

export default function LabsExperimentLoading() {
    return (
        <LabsShell>
            <div className="px-24 pb-24 pt-36 max-tablet:px-8 max-tablet:pt-28 max-phone:px-[1.1rem]" aria-hidden="true">
                <SkeletonPulse className="mb-8 h-3 w-[220px] !bg-[#1a1a24]" />
                <SkeletonPulse className="mb-4 h-10 w-[min(100%,420px)] !bg-[#1a1a24]" />
                <SkeletonPulse className="mb-10 h-3.5 w-full max-w-[560px] !bg-[#1a1a24]" />
                <SkeletonPulse className="h-[420px] w-full rounded-2xl !bg-[#1a1a24]" />
            </div>
        </LabsShell>
    );
}
