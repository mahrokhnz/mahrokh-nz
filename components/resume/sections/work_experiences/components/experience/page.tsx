import {GoDotFill} from "react-icons/go";

interface ExperienceProps {
    item: {
        id: number;
        startDate: string;
        endDate: string;
        title: string;
        company: string;
        description: string;
        skills?: string[]
    }
}

function Experience({item}: ExperienceProps) {
    function getDurationString(startDate: string, endDate?: string): string {
        const start = new Date(startDate);
        const end = endDate && endDate !== "" ? new Date(endDate) : new Date();

        let years = end.getFullYear() - start.getFullYear();
        let months = end.getMonth() - start.getMonth();

        if (months < 0) {
            years -= 1;
            months += 12;
        }

        const yearStr = years > 0 ? `${years} yr${years > 1 ? 's' : ''}` : '';
        const monthStr = months > 0 ? `${months} mo${months > 1 ? 's' : ''}` : '';

        if (yearStr && monthStr) return `${yearStr} and ${monthStr}`;
        if (yearStr) return yearStr;
        if (monthStr) return monthStr;
        return 'Less than a month';
    }


    return (
      <div className="flex items-start justify-between gap-[4mm]">
          <div className="flex w-[35mm] flex-col gap-[2mm]">
              <span className="text-[4.8mm]">{new Date(item.startDate).getFullYear()} - {item.endDate ? new Date(item.endDate).getFullYear() : new Date().getFullYear()}</span>
              <span className="text-[3.7mm]">{getDurationString(item.startDate, item.endDate)}</span>
          </div>
          <GoDotFill className="text-[5mm]"/>
          <div className="flex w-[122mm] flex-col gap-[2mm]">
                <h4 className="text-[5.1mm] font-semibold">{item.title}</h4>
                <span className="text-[4.7mm]">{item.company}</span>
              {item.description && (
                  <p className="text-[4.5mm]">{item.description}</p>
              )}

                <ul className="mt-[2.5mm] flex flex-wrap gap-[0.8mm] text-[3.7mm]">
                    {item.skills && item.skills?.length > 0 && item.skills.map((skill: string, index: number) => (
                        <li key={`Skill-${index + 1}`} className="rounded-[2mm] bg-(--darkColor) px-[1.2mm] py-[0.6mm] text-(--whiteColor)">
                            {skill}
                        </li>
                    ))}
                </ul>
            </div>
      </div>
  );
}

export default Experience;
