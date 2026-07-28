import { FaGithubSquare } from "react-icons/fa";
import { FaHackerrank } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import cls from "@/utils/class_names";

interface ContactProps {
    isFooter?: boolean;
}

const iconLinkClass = (isFooter: boolean) => cls(
    "flex items-center justify-center rounded-[0.3rem] border-2 border-solid transition-[border-color] duration-300 ease-in-out",
    isFooter
        ? "border-(--firstWaveColor) hover:border-(--neutralColor)"
        : "border-(--primaryColor) hover:border-[#544df0]"
);

const iconClass = (isFooter: boolean) => cls(
    "cursor-pointer text-[28px]",
    isFooter ? "text-(--neutralColor)" : "text-[#544df0]"
);

function Contact({isFooter = false}: ContactProps) {
    return (
        <div className="flex gap-8">
            <a
                className={iconLinkClass(isFooter)}
                href="https://github.com/mahrokhnz"
                target="_blank"
                aria-label="GitHub Profile"
            >
                <FaGithubSquare className={iconClass(isFooter)} />
            </a>
            <a
                className={iconLinkClass(isFooter)}
                href="https://www.hackerrank.com/mahrokhnz"
                target="_blank"
                aria-label="HackerRank Profile"
            >
                <FaHackerrank className={iconClass(isFooter)} />
            </a>
            <a
                className={iconLinkClass(isFooter)}
                href="https://www.linkedin.com/in/mahrokh-nabizadeh-335326144/"
                target="_blank"
                aria-label="LinkedIn Profile"
            >
                <FaLinkedin className={iconClass(isFooter)} />
            </a>
        </div>
    );
}

export default Contact;
