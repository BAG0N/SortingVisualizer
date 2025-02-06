import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/settings', label: 'Settings' },
  { href: '/about', label: 'About' },
]

const Navbar = () => {
  const { pathname } = useLocation()
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    document.documentElement.classList.add(theme)
    document.documentElement.dataset.theme = theme
  }, [])

  return (
    <nav className="bg-stone-900 outline outline-black shadow-lg text-white px-2 flex justify-center">
      <div className="container mx-auto flex justify-between items-center">
        <ul className="flex gap-4">
          {LINKS.map((link) => (
            <li
              key={link.href}
              className={pathname === link.href ? 'text-lime-400' : ''}
            >
              <Link to={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
