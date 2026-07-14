import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import GooeyNav from './GooeyNav'

interface NavContextValue {
  previousPath: string | null
  setPreviousPath: (path: string) => void
}

const NavContext = createContext<NavContextValue>({
  previousPath: null,
  setPreviousPath: () => {},
})

export function useNav() {
  return useContext(NavContext)
}

interface NavProviderProps {
  children: ReactNode
}

export function NavProvider({ children }: NavProviderProps) {
  const [previousPath, setPreviousPath] = useState<string | null>(null)
  const location = useLocation()

  // Track the previous path whenever we navigate to a new page
  const trackPrevious = useCallback((path: string) => {
    setPreviousPath(path)
  }, [])

  return (
    <NavContext.Provider value={{ previousPath, setPreviousPath: trackPrevious }}>
      {children}
    </NavContext.Provider>
  )
}

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Archive', href: '/archive' },
  { label: 'About', href: '/about' },
]

export default function NavBar() {
  const location = useLocation()

  const activeIndex = navItems.findIndex(item => item.href === location.pathname)

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4">
      <GooeyNav
        items={navItems}
        initialActiveIndex={activeIndex >= 0 ? activeIndex : 0}
      />
    </div>
  )
}
