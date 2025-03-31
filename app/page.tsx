"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Car, CheckSquare } from "lucide-react";
import { useTranslations } from "@/lib/hooks/use-translations";
import { LanguageSelector } from "@/components/language-selector";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  const { t } = useTranslations();

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-24">
      <div className="max-w-5xl w-full">
        <div className="flex justify-end mb-4 gap-2">
          <ThemeToggle />
          <LanguageSelector />
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            {t("hero_title")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("hero_subtitle")}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-12">
          <Card>
            <CardHeader className="space-y-1">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>{t("study_materials")}</CardTitle>
              <CardDescription>{t("study_materials_desc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {t("study_materials_content")}
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                {t("browse_materials")}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="space-y-1">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                <CheckSquare className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>{t("mock_tests")}</CardTitle>
              <CardDescription>{t("mock_tests_desc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {t("mock_tests_content")}
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/mock-test" className="w-full">
                <Button className="w-full">{t("start_mock_test")}</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="space-y-1">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                <Car className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>{t("practical_tips")}</CardTitle>
              <CardDescription>{t("practical_tips_desc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {t("practical_tips_content")}
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                {t("view_tips")}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="bg-primary/5 rounded-xl p-6 md:p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">{t("ready_to_ace")}</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            {t("ready_to_ace_desc")}
          </p>
          <Link href="/mock-test">
            <Button size="lg">{t("take_mock_now")}</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
