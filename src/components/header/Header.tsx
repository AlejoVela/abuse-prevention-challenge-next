import type { FC } from "react"
import style from './Header.module.scss'
import logo from "../../../public/assets/img/logo.png"

const Header: FC = () => {
  return (
    <header className={style["header"]}>
      <nav className={style["nav"]}>
        <img className={style["nav__logo"]} src={logo.src} alt="Logo" />
      </nav>
    </header>
  )
}

export default Header