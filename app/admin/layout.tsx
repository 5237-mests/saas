"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShieldCheck, Home, BookOpen, FolderPlus, FileText } from "lucide-react"
import { LanguageSelector } from "@/components/language-selector"
import { useTranslations } from "@/lib/hooks/use-translations"
import { ThemeToggle } from "@/components/theme-toggle"

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { t } = useTranslations()

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Sidebar */}
      <div className="bg-slate-900 text-white w-full md:w-64 md:min-h-screen p-4">
        <div className="flex items-center gap-2 mb-8">
          <ShieldCheck className="h-6 w-6" />
          <h1 className="text-xl font-bold">{t("admin")}</h1>
        </div>

        <nav className="space-y-1">
          <Link href="/admin" className="block">
            <Button variant="ghost" className="w-full justify-start text-white hover:text-white hover:bg-slate-800">
              <Home className="mr-2 h-4 w-4" />
              {t("dashboard")}
            </Button>
          </Link>
          <Link href="/admin/categories" className="block">
            <Button variant="ghost" className="w-full justify-start text-white hover:text-white hover:bg-slate-800">
              <FolderPlus className="mr-2 h-4 w-4" />
              {t("categories")}
            </Button>
          </Link>
          <Link href="/admin/questions" className="block">
            <Button variant="ghost" className="w-full justify-start text-white hover:text-white hover:bg-slate-800">
              <FileText className="mr-2 h-4 w-4" />
              {t("questions")}
            </Button>
          </Link>
          <Link href="/" className="block">
            <Button variant="ghost" className="w-full justify-start text-white hover:text-white hover:bg-slate-800">
              <BookOpen className="mr-2 h-4 w-4" />
              {t("view_site")}
            </Button>
          </Link>
        </nav>

        <div className="mt-auto pt-6 flex flex-col gap-2">
          <ThemeToggle />
          <LanguageSelector />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 bg-background">{children}</div>
    </div>
  )
}

