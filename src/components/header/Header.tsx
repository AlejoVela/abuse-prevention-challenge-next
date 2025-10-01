import type { FC } from "react";
import style from "./Header.module.scss";
import logo from "../../../public/assets/img/logo.png";
import Image from "next/image";

const Header: FC = () => {
  return (
    <header className={style["header"]}>
      <nav className={style["nav"]}>
        <Image className={style["nav__logo"]} src={logo.src} alt="Logo" width={64} height={44} />
      </nav>
    </header>
  );
};

export default Header;
