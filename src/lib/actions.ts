"use server";

import { prisma } from "@/prisma";
import { redirect } from "next/navigation";

interface CreateGameSession {
  id: string | null;
}

export async function createGameSession(storyId: string) {
  const session: CreateGameSession = {
    id: null,
  };

  try {
    const existingSession = await prisma.gameSession.findFirst({
      where: {
        userId: "abc",
        storyId,
      },
    });

    // Later we'll allow to resume session from here.
    if (existingSession) {
      await prisma.gameSession.delete({
        where: {
          id: existingSession.id,
        },
      });
    }

    const story = await prisma.story.findFirst({
      where: {
        id: storyId,
      },
    });

    if (!story || !story.startNodeId) {
      return {
        message: "Database Error: Story Not Found",
      };
    }

    const startNodeId = story.startNodeId;

    const gameSession = await prisma.gameSession.create({
      data: {
        userId: "abc",
        storyId: storyId,
        steps: {
          create: [
            {
              nodeId: startNodeId,
            },
          ],
        },
      },
    });
    session.id = gameSession.id;
  } catch (error) {
    console.log({ error });
    return {
      message: "Database Error: Failed to Create Game Session.",
    };
  }

  redirect(`/play/${session.id}`);
}
