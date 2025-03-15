import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Car, CheckSquare } from "lucide-react"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-24">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">Driving License Exam Preparation</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Practice for your driving license test with our comprehensive mock exams covering all essential topics.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-12">
          <Card>
            <CardHeader className="space-y-1">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Study Materials</CardTitle>
              <CardDescription>Access comprehensive study guides and resources</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our study materials cover all the topics you need to know for your driving license exam, from traffic
                rules to vehicle mechanics.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Browse Materials
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="space-y-1">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                <CheckSquare className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Mock Tests</CardTitle>
              <CardDescription>Practice with realistic exam simulations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Take mock tests that simulate the actual driving license exam. Get instant feedback and track your
                progress.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/mock-test" className="w-full">
                <Button className="w-full">Start Mock Test</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="space-y-1">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                <Car className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Practical Tips</CardTitle>
              <CardDescription>Learn from experienced drivers</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Get practical tips and advice from experienced drivers and instructors to help you pass your driving
                test.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Tips
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="bg-primary/5 rounded-xl p-6 md:p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to ace your driving test?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our mock tests are designed to help you prepare for the real thing. Start practicing today and increase your
            chances of passing on the first try.
          </p>
          <Link href="/mock-test">
            <Button size="lg">Take a Mock Test Now</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}

