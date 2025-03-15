import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function Contact() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-24">
      <div className="max-w-3xl mx-auto w-full">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        <p className="text-lg mb-8">
          Have questions or feedback? We'd love to hear from you. Fill out the form below and we'll get back to you as
          soon as possible.
        </p>

        <Card className="w-full mb-8">
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
            <CardDescription>We'll respond within 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input id="subject" placeholder="What's this about?" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea id="message" placeholder="Your message..." className="h-32" />
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Send Message</Button>
          </CardFooter>
        </Card>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Other Ways to Reach Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card p-6 rounded-lg shadow">
              <h3 className="text-xl font-medium mb-2">Email</h3>
              <p className="text-muted-foreground">contact@example.com</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow">
              <h3 className="text-xl font-medium mb-2">Phone</h3>
              <p className="text-muted-foreground">(123) 456-7890</p>
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

