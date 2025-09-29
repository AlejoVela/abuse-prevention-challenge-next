import type { FC } from "react"
import './Header.scoped.scss'
import logo from "@/assets/img/logo.png"

const Header: FC = () => {
  return (
    <header className="header">
      <nav className="nav">
        <img className="nav__logo" src={logo} alt="Logo" />
      </nav>
    </header>
  )
}

export default Header