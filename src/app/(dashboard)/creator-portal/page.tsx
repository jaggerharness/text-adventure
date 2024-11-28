"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Story {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

const initialStories: Story[] = [
  {
    id: 1,
    title: "The Enchanted Forest",
    content: "Once upon a time...",
    createdAt: "2023-05-01",
  },
  {
    id: 2,
    title: "City of Dreams",
    content: "In a bustling metropolis...",
    createdAt: "2023-05-15",
  },
  {
    id: 3,
    title: "Journey to the Stars",
    content: "As the rocket launched...",
    createdAt: "2023-06-01",
  },
];

export default function CreatorPage() {
  const [stories, setStories] = useState<Story[]>(initialStories);
  const [editingStory, setEditingStory] = useState<Story | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEditStory = (story: Story) => {
    setEditingStory(story);
    setIsDialogOpen(true);
  };

  const handleCreateNewStory = () => {
    setEditingStory({
      id: Date.now(),
      title: "",
      content: "",
      createdAt: new Date().toISOString().split("T")[0],
    });
    setIsDialogOpen(true);
  };

  const handleSaveStory = (updatedStory: Story) => {
    if (stories.find((s) => s.id === updatedStory.id)) {
      setStories(
        stories.map((s) => (s.id === updatedStory.id ? updatedStory : s))
      );
    } else {
      setStories([...stories, updatedStory]);
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Created Adventures</h1>
        <Button onClick={handleCreateNewStory}>Create New Adventure</Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stories.map((story) => (
          <Card key={story.id}>
            <CardHeader>
              <CardTitle>{story.title}</CardTitle>
              <CardDescription>Created on {story.createdAt}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-3">{story.content}</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleEditStory(story)}>Edit</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingStory?.id ? "Edit Story" : "Create New Story"}
            </DialogTitle>
            <DialogDescription>
              {editingStory?.id
                ? "Make changes to your story here."
                : "Create a new story here."}
            </DialogDescription>
          </DialogHeader>
          <StoryForm story={editingStory} onSave={handleSaveStory} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface StoryFormProps {
  story: Story | null;
  onSave: (story: Story) => void;
}

function StoryForm({ story, onSave }: StoryFormProps) {
  const [title, setTitle] = useState(story?.title || "");
  const [content, setContent] = useState(story?.content || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (story) {
      onSave({ ...story, title, content });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="title" className="text-right">
            Title
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="content" className="text-right">
            Content
          </Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </form>
  );
}
