interface SkillsListProps {
    title: string;

    data: Array<{
        id: number;
        title: string;
    }>
}

function SkillsList({title, data}: SkillsListProps) {
  return (
      <div>
          <h4 className="mb-[2mm] text-[5.1mm] font-semibold">{title}</h4>
          <ul className="grid auto-cols-max grid-flow-col grid-rows-7 gap-x-[5mm] gap-y-[2mm]">
              {data.map((skill) => (
                  <li className="text-[4.7mm] text-nowrap" key={skill.id}>
                      {skill.title}
                  </li>
              ))}
          </ul>
      </div>
  );
}

export default SkillsList;
