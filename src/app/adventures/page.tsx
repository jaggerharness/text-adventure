import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const stories = [
  {
    id: 1,
    title: "The Dark Forest",
    description: "Explore a forest full of psychological mysteries.",
  },
  {
    id: 2,
    title: "Space Odyssey",
    description: "Embark on an interstellar journey to save humanity.",
  },
  {
    id: 3,
    title: "The Haunted Mansion",
    description: "Uncover the secrets of a mysterious old house.",
  },
];

export default function AdventurePickerPage() {
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
              <Link href={`/adventures/${story.id}`}>
                <Button className="mx-auto">Start Adventure</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="flex justify-center"></div>
    </div>
  );
}
