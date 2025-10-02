import type { FC } from "react";
import style from "./Header.module.scss";
import logo from "@/public/assets/img/logo.png";
import Image from "next/image";
import LanguageSelector from "@/components/language-selector";

const Header: FC = () => {
  return (
    <header className={style["header"]}>
      <nav className={style["nav"]}>
        <Image priority className={style["nav__logo"]} src={logo.src} alt="Logo" width={64} height={44} />
        <LanguageSelector />
      </nav>
    </header>
  );
};

export default Header;
