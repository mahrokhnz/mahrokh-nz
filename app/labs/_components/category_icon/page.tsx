import {
    LuChartBar,
    LuCodeXml,
    LuCrosshair,
    LuShield,
    LuSlidersHorizontal,
} from "react-icons/lu";

const iconMap = {
    code: LuCodeXml,
    crosshair: LuCrosshair,
    chart: LuChartBar,
    shield: LuShield,
    sliders: LuSlidersHorizontal,
} as const;

export type LabsIconName = keyof typeof iconMap;

function CategoryIcon({name}: {name: string}) {
    const Icon = iconMap[name as LabsIconName] ?? LuCodeXml;

    return (
        <span className="inline-flex size-9 items-center justify-center rounded-lg border border-[var(--labs-border)] bg-[rgba(139,139,255,0.06)] text-[var(--labs-accent)]">
            <Icon className="size-[1.05rem]" strokeWidth={1.75} />
        </span>
    );
}

export default CategoryIcon;
