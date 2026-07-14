import SplitText from '@/components/SplitText'
import ScrambledText from '@/components/ScrollReveal'

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 pt-20">
      <SplitText
        text="About"
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
        Hycloud Blog is a space for thoughts, tutorials, and experiments. I write about
        React, web development, design, and the tools that make building the web enjoyable.
      </ScrambledText>

      <ScrambledText
        radius={120}
        duration={1}
        speed={0.5}
      >
        This blog is built with Vite, React, Tailwind CSS, and components from React Bits.
        Articles are written in Markdown and deployed on Cloudflare Pages.
      </ScrambledText>

      <ScrambledText
        radius={120}
        duration={1}
        speed={0.5}
      >
        The design philosophy is simple: clean typography, minimal decoration, and content that
        reads well. No distractions.
      </ScrambledText>
    </div>
  )
}
