import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>
        <p className="text-lg mb-4">
          Welcome to our web application! We're dedicated to providing a great user experience and powerful features.
        </p>
        <p className="text-lg mb-8">
          This is a sample About page. You can customize it with information about your company, team, mission, or
          project.
        </p>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card p-6 rounded-lg shadow">
              <h3 className="text-xl font-medium mb-2">Jane Doe</h3>
              <p className="text-muted-foreground">Founder & CEO</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow">
              <h3 className="text-xl font-medium mb-2">John Smith</h3>
              <p className="text-muted-foreground">Lead Developer</p>
            </div>
          </div>
        </div>

        <Link href="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    </main>
  )
}

