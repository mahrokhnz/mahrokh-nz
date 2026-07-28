import {MdLanguage, MdOutlineEmail} from "react-icons/md";
import {FaLinkedin} from "react-icons/fa";
import cls from "@/utils/class_names";
import * as React from "react";
import {HiOutlineDevicePhoneMobile} from "react-icons/hi2";
import {GrLocation} from "react-icons/gr";

function Header() {
  return (
      <header className="relative flex justify-between before:absolute before:top-[12mm] before:left-[-35mm] before:text-[5mm] before:font-medium before:tracking-[2.5mm] before:text-(--whiteColor) before:content-['RESUME'] before:-rotate-90">
          <div className="flex flex-col">
              <span className="mb-[1.5mm] text-[9mm]">Mahrokh</span>
              <b className="mb-[3mm] text-[14mm]">Nabizadeh</b>
              <span className="text-[4.8mm] tracking-[1.2mm]">Frontend Developer</span>
          </div>

          <ul className="relative flex flex-col gap-[5mm] before:absolute before:top-[-15mm] before:left-[-2.3mm] before:z-[-1] before:h-[140%] before:w-[10mm] before:bg-(--darkColor) before:content-['']">
             <li className="flex gap-[12mm]">
                 <HiOutlineDevicePhoneMobile className="z-[1] text-[5mm] text-(--whiteColor)" />
                <span className="text-[4.1mm]">-</span>
             </li>
              <li className="flex gap-[12mm]">
                  <MdOutlineEmail className="z-[1] text-[5mm] text-(--whiteColor)"/>
                  <span>Mahrokh.nz@gmail.com</span>
              </li>
              <li className="flex gap-[12mm]">
                  <MdLanguage className="z-[1] text-[5mm] text-(--whiteColor)" />
                  <a className={cls("text-[4.1mm]", "cursor-pointer font-semibold text-(--linkColor)")} target='_blank' href="https://www.mahrokhnz.ir/">www.mahrokhnz.ir</a>
              </li>
              <li className="flex gap-[12mm]">
                  <FaLinkedin className="z-[1] text-[5mm] text-(--whiteColor)" />
                  <a className={cls("text-[4.1mm]", "cursor-pointer font-semibold text-(--linkColor)")} target='_blank' href="https://www.linkedin.com/in/mahrokh-nabizadeh-335326144/">Linkedin</a>
              </li>
              <li className="flex gap-[12mm]">
                  <GrLocation className="z-[1] text-[5mm] text-(--whiteColor)" />
                  <span className="text-[4.1mm]">Tehran, Iran</span>
              </li>
          </ul>
      </header>
  );
}

export default Header;
