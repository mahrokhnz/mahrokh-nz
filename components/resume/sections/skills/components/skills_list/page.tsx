interface SkillsListProps {
    title: string;
    data: Array<{
        id: number;
        title: string;
    }>
}

function SkillsList({title, data}: SkillsListProps) {
  return (
      <div className="flex-1">
          <h4 className="mb-[1.5mm] text-[4.6mm] font-semibold">{title}</h4>
          <p className="text-[3.8mm] leading-[1.35]">
              {data.map((skill) => skill.title).join(" · ")}
          </p>
      </div>
  );
}

export default SkillsList;
