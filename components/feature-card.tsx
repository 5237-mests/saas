import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Settings, Smartphone } from "lucide-react"

interface FeatureCardProps {
  title: string
  description: string
  icon: "Code" | "Settings" | "Smartphone"
}

export default function FeatureCard({ title, description, icon }: FeatureCardProps) {
  const IconComponent = () => {
    switch (icon) {
      case "Code":
        return <Code className="h-6 w-6" />
      case "Settings":
        return <Settings className="h-6 w-6" />
      case "Smartphone":
        return <Smartphone className="h-6 w-6" />
      default:
        return <Code className="h-6 w-6" />
    }
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="bg-primary/10 p-2 rounded-full">
          <IconComponent />
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  )
}

