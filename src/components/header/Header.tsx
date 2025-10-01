import type { FC } from "react"
import './Header.scoped.scss'
import logo from "../../../public/assets/img/logo.png"

const Header: FC = () => {
  return (
    <header className="header">
      <nav className="nav">
        <img className="nav__logo" src={logo.src} alt="Logo" />
      </nav>
    </header>
  )
}

export default Header