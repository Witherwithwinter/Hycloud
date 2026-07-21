import { useTranslation } from '@/i18n'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
        <span>{t('footer_copyright')}</span>
        <div className="flex items-center gap-4">
          <a href="/about" className="hover:text-foreground transition-colors">{t('footer_about')}</a>
          <a href="https://github.com/Witherwithwinter/Hycloud" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">{t('footer_github')}</a>
        </div>
      </div>
    </footer>
  )
}
