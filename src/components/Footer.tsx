export default function Footer() {
  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
        <span>© 2026 Hycloud Blog</span>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-foreground transition-colors">About</a>
          <a href="#" className="hover:text-foreground transition-colors">RSS</a>
          <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
        </div>
      </div>
    </footer>
  )
}
