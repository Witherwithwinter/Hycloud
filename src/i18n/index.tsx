import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { config } from '@/config'

export type Locale = 'en' | 'zh-CN'

export interface TranslationRecord {
  nav_home: string
  nav_archive: string
  nav_about: string

  hero_subtitle: string
  hero_button: string

  postlist_heading: string
  postlist_empty: string

  article_back: string
  article_prev: string
  article_next: string
  article_prev_mobile: string
  article_next_mobile: string

  archive_title: string
  about_title: string

  about_paragraph_1: string
  about_paragraph_2: string
  about_paragraph_3: string

  footer_copyright: string
  footer_about: string
  footer_github: string

  lang_toggle_aria: string
  mobile_menu_aria_label: string

  notfound_title: string
  notfound_message: string
  notfound_back: string
  article_notfound_title: string
  article_notfound_message: string | ((slug: string) => string)
  article_notfound_back: string
}

const translations: Record<Locale, TranslationRecord> = {
  en: {
    nav_home: 'Home',
    nav_archive: 'Archive',
    nav_about: 'About',

    hero_subtitle: 'Thoughts, tutorials, and experiments — written with clarity.',
    hero_button: 'Start Reading',

    postlist_heading: 'Latest Posts',
    postlist_empty: 'No posts yet.',

    article_back: 'Back',
    article_prev: 'Previous',
    article_next: 'Next',
    article_prev_mobile: '← Previous',
    article_next_mobile: 'Next →',

    archive_title: 'Archive',
    about_title: 'About',

    about_paragraph_1: 'Hylight is a space for thoughts, tutorials, and experiments. I write about React, web development, design, and the tools that make building the web enjoyable.',
    about_paragraph_2: 'This blog is built with Vite, React, Tailwind CSS, and components from React Bits. Articles are written in Markdown and deployed on Cloudflare Pages.',
    about_paragraph_3: 'The design philosophy is simple: clean typography, minimal decoration, and content that reads well. No distractions.',

    footer_copyright: '© 2026 Hylight',
    footer_about: 'About',
    footer_github: 'GitHub',

    lang_toggle_aria: 'Switch language',
    mobile_menu_aria_label: 'Mobile navigation',

    notfound_title: '404',
    notfound_message: 'Post not found',
    notfound_back: 'Back to home',
    article_notfound_title: 'Post not found',
    article_notfound_message: (slug: string) => `Post "${slug}" not found`,
    article_notfound_back: 'Back',
  },
  'zh-CN': {
    nav_home: '首页',
    nav_archive: '归档',
    nav_about: '关于',

    hero_subtitle: '随笔、教程与实验 —— 力求清晰表达。',
    hero_button: '开始阅读',

    postlist_heading: '最新文章',
    postlist_empty: '暂无文章。',

    article_back: '返回',
    article_prev: '上一篇',
    article_next: '下一篇',
    article_prev_mobile: '← 上一篇',
    article_next_mobile: '下一篇 →',

    archive_title: '归档',
    about_title: '关于',

    about_paragraph_1: 'Hylight 是一个存放思考、教程和实验的空间。我撰写关于 React、Web 开发、设计以及让构建 Web 变得愉悦的工具的文章。',
    about_paragraph_2: '这个博客使用 Vite、React、Tailwind CSS 和 React Bits 组件构建。文章以 Markdown 撰写并部署在 Cloudflare Pages 上。',
    about_paragraph_3: '设计理念很简单：清晰的排版、极简的装饰，以及易于阅读的内容。没有干扰。',

    footer_copyright: '© 2026 Hylight',
    footer_about: '关于',
    footer_github: 'GitHub',

    lang_toggle_aria: '切换语言',
    mobile_menu_aria_label: '移动导航',

    notfound_title: '404',
    notfound_message: '未找到文章',
    notfound_back: '返回首页',
    article_notfound_title: '未找到文章',
    article_notfound_message: (slug: string) => `文章 "${slug}" 不存在`,
    article_notfound_back: '返回',
  },
}

interface I18nContextValue {
  locale: Locale
  t: (key: keyof TranslationRecord, ...args: any[]) => string
  setLanguage: (locale: Locale) => void
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(config.DEFAULT_LOCALE)

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const value = useMemo<I18nContextValue>(() => ({
    locale,
    t: (key) => translations[locale][key],
    setLanguage: (nextLocale: Locale) => setLocaleState(nextLocale),
  }), [locale])

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  )
}

export function useTranslation() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useTranslation must be used within I18nProvider')
  return ctx
}
