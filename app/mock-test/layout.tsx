"use client";

import type React from "react";
import Link from "next/link";
import { ExamProvider } from "@/components/exam-context";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";
import { LanguageSelector } from "@/components/language-selector";
import { useTranslations } from "@/lib/hooks/use-translations";
import { ThemeToggle } from "@/components/theme-toggle";

export default function MockTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t } = useTranslations();

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">{t("app_name")}</h1>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LanguageSelector />
            <Link href="/admin">
              <Button
                variant="secondary"
                size="sm"
                className="flex items-center gap-1"
              >
                <ShieldCheck className="h-4 w-4" />
                {t("admin")}
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="container mx-auto py-8 px-4">
        <ExamProvider>{children}</ExamProvider>
      </main>
    </div>
  );
}
