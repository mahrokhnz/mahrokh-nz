import {
    ControlsSidebar,
    GeneratedCodePanel,
    SegmentedButtons,
} from "@/app/labs/_components/playgrounds/controls/page";
import {CODE_TABS, type CodeTab} from "../constants";

interface FlexboxCodePanelProps {
    css: string;
    tailwind: string;
    tab: CodeTab;
    copied: boolean;
    onTabChange: (tab: CodeTab) => void;
    onCopy: () => void;
}

function FlexboxCodePanel({css, tailwind, tab, copied, onTabChange, onCopy}: FlexboxCodePanelProps) {
    return (
        <ControlsSidebar title="GENERATED CSS" side="right" maxWidthClassName="max-w-[320px]">
            <SegmentedButtons value={tab} onChange={onTabChange} options={CODE_TABS} />
            <GeneratedCodePanel
                code={tab === "css" ? css : tailwind}
                copied={copied}
                onCopy={onCopy}
                copyLabel={tab === "css" ? "Copy CSS" : "Copy Tailwind"}
            />
        </ControlsSidebar>
    );
}

export default FlexboxCodePanel;
