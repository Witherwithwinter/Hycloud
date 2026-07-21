import SplitText from '@/components/SplitText'
import ScrambledText from '@/components/ScrambledText'
import { useTranslation } from '@/i18n'

export default function AboutPage() {
  const { t } = useTranslation()

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 pt-20">
      <SplitText
        text={t('about_title')}
        className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-8"
        tag="h1"
        delay={40}
        duration={1}
        ease="power3.out"
        from={{ opacity: 0, y: 30 }}
        to={{ opacity: 1, y: 0 }}
        textAlign="left"
      />

      <ScrambledText
        radius={120}
        duration={1}
        speed={0.5}
      >
        {t('about_paragraph_1')}
      </ScrambledText>

      <ScrambledText
        radius={120}
        duration={1}
        speed={0.5}
      >
        {t('about_paragraph_2')}
      </ScrambledText>

      <ScrambledText
        radius={120}
        duration={1}
        speed={0.5}
      >
        {t('about_paragraph_3')}
      </ScrambledText>
    </div>
  )
}
