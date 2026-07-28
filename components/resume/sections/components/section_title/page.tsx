import {IconType} from "react-icons";

interface SectionTitleProps {
  text: string;
  icon: IconType;
}

function SectionTitle({text, icon: Icon}: SectionTitleProps) {
  return (
      <div className="relative mb-[10mm] ml-[-20mm] flex items-center gap-[11mm]">
          <Icon className="text-[8mm] text-(--whiteColor)" />
        <h3 className="text-[5.6mm] font-semibold">{text}</h3>
        <div className="absolute top-[12mm] h-[0.5mm] w-full bg-(--lineColor)" />
      </div>
  );
}

export default SectionTitle;
