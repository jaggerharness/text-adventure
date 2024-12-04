import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { prisma } from "@/prisma";
import { PlayButton } from "./components/play-button";
import { GameSessionStatus } from "@prisma/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const userId = "abc";

export default async function AdventurePickerPage() {
  const stories = await prisma.story.findMany({
    include: {
      sessions: {
        where: {
          userId,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  return (
    <div className="px-8 pb-8 pt-24 flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-center">Choose Your Adventure</h1>
      <div className="relative">
        <Search className="absolute left-2 top-2.5 size-4 text-muted-foreground" />
        <Input placeholder="Search adventures" className="pl-8" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <Card key={story.id}>
            <CardHeader>
              <CardTitle>{story.title}</CardTitle>
              <CardDescription>{story.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              {(story.sessions.length === 0 ||
                (story.sessions.length !== 0 &&
                  story.sessions.at(0)?.status ===
                    GameSessionStatus.COMPLETED)) && (
                <PlayButton storyId={story.id} />
              )}
              {story.sessions.length !== 0 &&
                story.sessions.at(0)?.status === GameSessionStatus.STARTED && (
                  <Link href={`/play/${story.sessions.at(0)?.id}`}>
                    <Button className="ml-auto">Continue</Button>
                  </Link>
                )}
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="flex justify-center"></div>
    </div>
  );
}
