"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FolderPlus, FileText, Users, BarChart } from "lucide-react"
import { useTranslations } from "@/lib/hooks/use-translations"

export default function AdminDashboard() {
  const { t } = useTranslations()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{t("dashboard")}</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t("total_categories")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">6</div>
              <FolderPlus className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t("total_questions")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">30</div>
              <FileText className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t("total_users")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">124</div>
              <Users className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t("tests_taken")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">287</div>
              <BarChart className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("quick_actions")}</CardTitle>
            <CardDescription>{t("manage_content")}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Link href="/admin/categories/new">
              <div className="flex items-center p-3 hover:bg-slate-100 rounded-md cursor-pointer">
                <FolderPlus className="h-5 w-5 mr-3 text-primary" />
                <div>{t("add_new_category")}</div>
              </div>
            </Link>
            <Link href="/admin/questions/new">
              <div className="flex items-center p-3 hover:bg-slate-100 rounded-md cursor-pointer">
                <FileText className="h-5 w-5 mr-3 text-primary" />
                <div>{t("add_new_question")}</div>
              </div>
            </Link>
            <Link href="/admin/questions/bulk">
              <div className="flex items-center p-3 hover:bg-slate-100 rounded-md cursor-pointer">
                <FileText className="h-5 w-5 mr-3 text-primary" />
                <div>{t("bulk_upload")}</div>
              </div>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("recent_activity")}</CardTitle>
            <CardDescription>{t("latest_changes")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-2">
                <p className="text-sm font-medium">Added 5 new questions to "Traffic Rules"</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
              <div className="border-b pb-2">
                <p className="text-sm font-medium">Updated "Road Signs" category</p>
                <p className="text-xs text-muted-foreground">Yesterday</p>
              </div>
              <div className="border-b pb-2">
                <p className="text-sm font-medium">Deleted 2 questions from "Engine"</p>
                <p className="text-xs text-muted-foreground">3 days ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

