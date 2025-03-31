"use client"

import { useAppDispatch } from "@/lib/redux/hooks"
import { type Language, setLanguage } from "@/lib/redux/languageSlice"
import { useTranslations } from "@/lib/hooks/use-translations"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"

export function LanguageSelector() {
  const dispatch = useAppDispatch()
  const { t, language } = useTranslations()

  const handleLanguageChange = (lang: Language) => {
    dispatch(setLanguage(lang))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span>{t("language")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => handleLanguageChange("en")}
          className={language === "en" ? "bg-primary/10" : ""}
        >
          {t("english")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleLanguageChange("am")}
          className={language === "am" ? "bg-primary/10" : ""}
        >
          {t("amharic")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleLanguageChange("om")}
          className={language === "om" ? "bg-primary/10" : ""}
        >
          {t("afan_oromo")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

