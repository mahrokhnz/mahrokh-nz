interface EducationItemProps {
    item: {
        id: number;
        university: string;
        degree: string;
        period: string;
        moreInfo: string;
    }
}

function EducationItem({item}: EducationItemProps) {
  return (
      <div className="flex flex-1 flex-col gap-[1.2mm]">
          <h4 className="text-[4.4mm] font-semibold uppercase">{item.degree}</h4>
          <span className="text-[3.9mm]">{item.university}</span>
          <p className="text-[3.7mm]">{item.moreInfo}</p>
          <span className="text-[3.4mm]">{item.period}</span>
      </div>
  );
}

export default EducationItem;
