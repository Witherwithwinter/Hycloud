import type { Locale } from '@/i18n'

/**
 * ============================
 *  Blog Configuration
 * ============================
 *
 * Developers can switch the site language and basic info
 * by simply editing this file. No frontend toggle needed.
 */

export const config = {
  /**
   * Default site locale
   *
   * Options:
   *   - 'en'    English
   *   - 'zh-CN' Simplified Chinese
   *
   * After switching, all UI text (nav, Hero, About, footer, etc.) updates automatically.
   */
  DEFAULT_LOCALE: 'en' as Locale,
}
