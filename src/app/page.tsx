"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

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

export default function StoryPickerPage() {
  const [selectedStory, setSelectedStory] = useState<number | null>(null);
  const router = useRouter();

  const handleStorySelect = (id: number) => {
    setSelectedStory(id);
  };

  const handleStartAdventure = () => {
    if (selectedStory !== null) {
      router.push(`/adventure/${selectedStory}`);
    } else {
      alert("Please select a story");
    }
  };

  return (
    <div className="px-8 pb-8 pt-24">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Choose Your Adventure
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <Card
            key={story.id}
            className={`cursor-pointer ${
              selectedStory === story.id ? "border-2" : ""
            }`}
            onClick={() => handleStorySelect(story.id)}
          >
            <CardHeader>
              <CardTitle>{story.title}</CardTitle>
              <CardDescription>{story.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Button
          onClick={handleStartAdventure}
          disabled={selectedStory === null}
        >
          Start Adventure
        </Button>
      </div>
    </div>
  );
}
