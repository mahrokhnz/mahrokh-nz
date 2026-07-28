import Circle from "@/components/circle/page";
import {SkillType} from "@/app/(home)/_sections/skills/type";

interface SkillsListProps {
    data: SkillType[];
    inView: boolean;
}

function SkillsList({data, inView}: SkillsListProps) {
  return (
      <ul className="flex grow flex-col gap-8">
          {
              data.map((skill) => {
                  return (
                      (
                          <li key={skill.id} className="flex justify-between gap-8">
                              <h3 className="text-[1.5rem] max-tablet:text-[1.3rem] max-phone:text-base">{skill.title}</h3>
                              <div className="flex gap-[0.4rem]">
                                  {[...Array(10)].map((_, index) => (
                                      <Circle key={index} filled={inView && index < skill.count} delay={index * 0.1}/>
                                  ))}
                              </div>
                          </li>
                      )
                  )
              })
          }
      </ul>
  );
}

export default SkillsList;
