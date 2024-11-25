import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Sparkles, Send } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AdventurePickerPage() {
  return (
    <div className="min-h-screen">
      <section
        className={
          "flex flex-row bg-primary-foreground justify-between items-center p-4 border-b border-border/40"
        }
      >
        <Link href="/">
          <Image
            aria-hidden
            src="/TextVenture.svg"
            alt="File icon"
            width={250}
            height={250}
          />
        </Link>
        <Link href={"/adventures"}>
          <Button>Adventures</Button>
        </Link>
      </section>
      <main>
        <section className="py-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 ">
              Welcome to TextVenture AI
            </h1>
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto">
              Embark on a journey through time, space, and imagination. Join our
              community and unleash your creativity by registering as a creator
              to craft your own stories. All users can dive into an ever-growing
              library of both user-generated and AI-generated adventures.
            </p>
            <Link href="/register">
              <Button className="text-lg px-8 py-6">
                Begin Your Adventure
              </Button>
            </Link>
          </div>
        </section>

        <section className="py-20  bg-primary-foreground">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center ">
              Features of TextVenture AI
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <BookOpen className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Multiple Storylines
                </h3>
                <p>
                  Explore various eerie and thought-provoking narratives, each
                  with its own twists and turns.
                </p>
              </div>
              <div className="text-center">
                <Sparkles className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Mind-Bending Choices
                </h3>
                <p>
                  Your decisions matter. Shape the outcome of each story with
                  your choices.
                </p>
              </div>
              <div className="text-center">
                <Send className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Immersive Text Experience
                </h3>
                <p>
                  Vivid descriptions and atmospheric writing bring each scenario
                  to life in your imagination.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 ">
              Join The Waiting List
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Get notified when TextVenture AI 1.0.0 is released!
            </p>
            <form className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="max-w-sm"
              />
              <Button type="submit">Join Waitlist</Button>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t py-8  bg-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <p>
            &copy; {new Date().getFullYear()} TextVenture AI. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
