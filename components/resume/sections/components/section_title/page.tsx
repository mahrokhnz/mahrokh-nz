import {IconType} from "react-icons";

interface SectionTitleProps {
    text: string;
    icon: IconType;
    lead?: string;
}

function SectionTitle({text, icon: Icon, lead}: SectionTitleProps) {
    return (
        <div className="relative mb-[4mm] ml-[-20mm]">
            <div className="flex items-center gap-[11mm]">
                <Icon className="text-[7mm] text-(--whiteColor)"/>
                <h3 className="text-[5.2mm] font-semibold">{text}</h3>
            </div>
            <div className="absolute top-[8mm] h-[0.5mm] w-full bg-(--lineColor)"/>
            {lead && (
                <p className="mt-[5mm] ml-[20mm] text-[3.7mm] leading-[1.25]"
                   style={{color: "rgba(0, 0, 0, 0.7)"}}>{lead}</p>
            )}
        </div>
    );
}

export default SectionTitle;
