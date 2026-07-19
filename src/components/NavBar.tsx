import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Archive', href: '/archive' },
  { label: 'About', href: '/about' },
]

export default function NavBar() {
  const location = useLocation()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4">
      <div className="flex items-center gap-6 bg-card/80 backdrop-blur-sm rounded-full px-6 py-2 border border-border">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={`text-sm font-medium transition-colors ${
              location.pathname === item.href
                ? 'text-foreground'
                : 'text-muted hover:text-foreground'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
