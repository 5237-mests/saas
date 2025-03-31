"use client"

import { useAppSelector } from "@/lib/redux/hooks"
import { selectLanguage } from "@/lib/redux/languageSlice"
import { translations } from "@/lib/translations"
import type { TranslationKey } from "@/lib/translations"

export function useTranslations() {
  const language = useAppSelector(selectLanguage)

  const t = (key: TranslationKey) => {
    return translations[language][key] || key
  }

  return { t, language }
}

