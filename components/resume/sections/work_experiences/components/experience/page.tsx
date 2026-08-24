import {GoDotFill} from "react-icons/go";

interface ExperienceProps {
    item: {
        id: number;
        startDate: string;
        endDate: string;
        title: string;
        company: string;
        highlights?: string[];
        skills?: string[];
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

        const yearStr = years > 0 ? `${years} yr${years > 1 ? "s" : ""}` : "";
        const monthStr = months > 0 ? `${months} mo${months > 1 ? "s" : ""}` : "";

        if (yearStr && monthStr) return `${yearStr} and ${monthStr}`;
        if (yearStr) return yearStr;
        if (monthStr) return monthStr;
        return "Less than a month";
    }

    return (
      <div className="flex items-start justify-between gap-[4mm]">
          <div className="flex w-[35mm] flex-col gap-[1.2mm]">
              <span className="text-[4.4mm]">{new Date(item.startDate).getFullYear()} - {item.endDate ? new Date(item.endDate).getFullYear() : new Date().getFullYear()}</span>
              <span className="text-[3.4mm]">{getDurationString(item.startDate, item.endDate)}</span>
          </div>
          <GoDotFill className="mt-[1mm] text-[4.5mm]"/>
          <div className="flex w-[122mm] flex-col gap-[1.4mm]">
                <h4 className="text-[4.8mm] font-semibold">{item.title}</h4>
                <span className="text-[4.2mm]">{item.company}</span>
                {item.highlights && item.highlights.length > 0 && (
                    <ul className="flex flex-col gap-[0.8mm] text-[3.8mm] leading-[1.28]">
                        {item.highlights.map((highlight) => (
                            <li key={highlight} className="pl-[3.5mm] indent-[-3.5mm]">
                                • {highlight}
                            </li>
                        ))}
                    </ul>
                )}
                {item.skills && item.skills.length > 0 && (
                    <p className="text-[3.5mm] leading-[1.25]">{item.skills.join(" · ")}</p>
                )}
            </div>
      </div>
  );
}

export default Experience;
