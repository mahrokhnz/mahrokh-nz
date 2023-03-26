const front = document.querySelector(".firstColumn");
const back = document.querySelector(".secondColumn");

const skills = [
  {
    column: 1,
    title: "Html",
    count: 9,
  },
  {
    column: 1,
    title: "CSS (Stylus/Sass)",
    count: 8,
  },
  {
    column: 2,
    title: "Node.js",
    count: 1,
  },
];

skills.map((skill) => {
  const newSkill = document.createElement("div");

  if (skill.column === 1) {
    front.appendChild(newSkill);
  } else {
    back.appendChild(newSkill);
  }

  newSkill.classList.add("skill");

  const title = document.createElement("h3");
  newSkill.appendChild(title);
  title.innerHTML = skill.title;

  const wrapper = document.createElement("div");
  newSkill.appendChild(wrapper);

  wrapper.classList.add("wrapper");
});
