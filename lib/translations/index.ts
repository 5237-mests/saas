import { en } from "./en"
import { am } from "./am"
import { om } from "./om"

export const translations = {
  en,
  am,
  om,
}

export type TranslationKey = keyof typeof en

